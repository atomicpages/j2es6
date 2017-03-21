const path = require('path');
const fs = require('fs');
const acorn = require('acorn');
const astring = require('astring');
const traverse = require('ast-traverse');
const glob = require('glob');
const gutils = require('gulp-util');
const PluginError = gutils.PluginError;
const through = require('through2');

const PLUGIN_NAME = require('../package.json').name;
const ProgramGenerator = require('../dist/generators/ProgramGenerator').ProgramGenerator;

let calleeNamespace = [];

/**
 * @param node {object} The node to test.
 * @returns {boolean}
 * @private
 */
function _isjQueryClass (node) {
    return node.object
        && node.object.type === 'Identifier'
        && node.object.name === '$'
        && node.property
        && node.property.type === 'Identifier'
        && node.property.name === 'Class';
}

/**
 * Recursively walks down the AST to build the extended classes' namespace.
 * @param callee {object} The callee object in the AST.
 * @param target {string[]} The array to push the namespace to.
 * @private
 */
function _buildCalleeExpression (callee, target) {
    if (!callee.hasOwnProperty('object')) {
        if (callee.name) {
            target.push(callee.name);
        }

        return;
    }

    if (callee && callee.property && callee.property.name) {
        target.push(callee.property.name);

        _buildCalleeExpression(callee.object, target);
    }
}

/**
 * @param node {object} The node to inspect.
 * @returns {boolean} True if the jQuery class is extending another jQuery class.
 * @private
 */
function _isjQueryClassExtension (node) {
    const ns_test = /([a-zA-Z0-9]\w*\.)+\w*[a-zA-Z0-9]$/;

    let boolean = node.callee
        && node.arguments
        && node.arguments.length > 0
        && node.arguments[0].type === 'Literal'
        && ns_test.test(node.arguments[0].value)
        && node.callee.type === 'MemberExpression'
        && node.callee.object
        && node.callee.property.type === 'Identifier'
        && node.callee.property.name === 'extend';

    if (boolean) {
        _buildCalleeExpression(node.callee.object, calleeNamespace);
        calleeNamespace.reverse();
    } else {
        return false;
    }

    return boolean && ns_test.test(calleeNamespace.join('.'));
}

/**
 * Handles the destination output.
 * @param options {object} The options to pass into the generator sequence.
 * @param code {object} The generated code as a raw AST.
 * @param info {object} File info.
 * @private
 */
function _destination (options, code, info) {
    if (options.destination === 'console') {
        console.log(code);
    } else {
        fs.writeFile(options.destination + '/' + info.name + '.es6' + info.ext, code, { mode: 0o644 }, function (err) {
            if (err) {
                throw new Error(err);
            }

            if (options.debug || options.verbose) {
                console.info('Wrote file ' + info.name);
            }
        });
    }
}

/**
 * Handles the file by starting the conversion process.
 * @param file {string|Buffer} The path to the file.
 * @param options {object}
 * @param {object} [info=path.parse(file)] Pass file information used to generate the output.
 * @param [stream=false] {boolean}
 * @private
 */
function _handleFile (file, options, info, stream) {
    info = info || path.parse(file);

    /* eslint-disable no-shadow */
    let _parse = function (content, options, info, stream) {
        let code = '';
        let hit = false;

        let ast = acorn.parse(content, {
            sourceType: 'script',
            ranges: true
            // onComment: function (block, text, start, end) {} // TODO: extract comments and add to generated code
        });

        traverse(ast, {
            pre: (node, parent) => {
                if (hit) {
                    return; // TODO: benchmark this
                }

                if (node.type === 'MemberExpression') {
                    if (_isjQueryClass(node)) {
                        code = astring(ProgramGenerator.build(parent.arguments, options));
                        hit = true;

                        if (!stream) {
                            _destination(options, code, info);
                        }
                    }
                } else if (node.type === 'CallExpression' && _isjQueryClassExtension(node)) {
                    options.extended = true;
                    options.extendedNamespace = calleeNamespace;
                    hit = true;

                    code = astring(ProgramGenerator.build(parent.expression.arguments, options));

                    if (!stream) {
                        _destination(options, code, info);
                    }
                }
            }
        });

        return code;
    };

    if (stream) {
        return _parse(file, options, info, stream);
    }

    fs.readFile(file, 'utf-8', (err, content) => {
        if (err) {
            throw new Error(err);
        }

        _parse(content, options, info, stream);
    });
}


/**
 * Kicks off the conversion process.
 * @param files {string[]|string} The array of files to process.
 * @param options {object}
 */
function convert (files, options) {
    const defaultOptions = { constructorName: 'init' };
    const opts = Object.assign({}, defaultOptions, options);

    if (Array.isArray(files) && files.length > 0) {
        if (files.length === 1) {
            files = glob.sync(path.normalize(files[0]));
        }

        files.forEach(file => {
            const info = path.parse(file);

            _handleFile(file, opts, info);
        });
    } else {
        return through.obj((file, encoding, callback) => {
            if (file.isNull()) {
                callback(null, file);
            }

            if (file.isStream()) {
                /* eslint-disable no-invalid-this */
                this.emit(new PluginError(PLUGIN_NAME, 'Streams are not supported.'));
            }

            if (Buffer.isBuffer(file.contents)) {
                let code = _handleFile(file.contents.toString(), opts, null, true);

                if (code) {
                    file.contents = new Buffer(code);
                }

                callback(null, file);
            } else {
                /* eslint-disable no-invalid-this */
                this.emit(new PluginError(PLUGIN_NAME, 'File contents must be a buffer!'));
            }
        });
    }

}

module.exports = convert;
