const path = require('path');
const fs = require('fs');
const acorn = require('acorn');
const astring = require('astring');
const traverse = require('ast-traverse');
const glob = require('glob');

const Generator = require('../dist/generator').Generator;

let calleeNamespace = [];

/**
 *
 * @param node {object} The node to test.
 * @returns {boolean}
 * @private
 */
function _isjQueryClass(node) {
	return node.object
		&& node.object.type === 'Identifier'
		&& node.object.name === '$'
		&& node.property
		&& node.property.type === 'Identifier'
		&& node.property.name === 'Class';
}

function _isjQueryClassExtension(node) {
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
		calleeNamespace.reverse().push('extend');
	} else {
		return false;
	}

	return boolean && ns_test.test(calleeNamespace.join('.'));
}

function _buildCalleeExpression(callee, target) {
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
 * Handles the file by starting the conversion process.
 * @param file {string} The path to the file.
 * @param {object} [info=path.parse(file)] Pass file information used to generate the output.
 * @private
 */
function _handleFile(file, info, options) {
	info = info || path.parse(file);

	fs.readFile(file, function (err, content) {
		let ast = acorn.parse(content.toString(), {
			sourceType: 'script',
			ranges: true
			// onComment: function (block, text, start, end) {} // TODO: extract comments and add them to ES6
		});

		traverse(ast, {
			pre: function (node, parent) {
				if (node.type === 'MemberExpression') {
					if (_isjQueryClass(node)) {
						let code = astring(Generator.build(parent.arguments, options));

						if (options.destination === 'console') {
							console.log(code);
						} else {
							fs.writeFile(options.destination + '/' + info.name + '.es6' + info.ext, code, {mode: 0o644}, err => {
								if (err) {
									throw new Error(err);
								}

								if (options.debug || options.verbose) {
									console.info('Wrote file ' + file);
								}
							});
						}
					}
				} else if (node.type === 'CallExpression' && _isjQueryClassExtension(node)) {
					console.log(calleeNamespace.join('.'));
				}
			}
		});
	});
}

/**
 * Kicks off the conversion process.
 * @param files {string[]|string} The array of files to process.
 * @param options {object}
 */
function convert(files, options) {

	const defaultOptions = { constructorName: 'init' };

	const opts = Object.assign({}, defaultOptions, options);

	'use strict';

	if (Array.isArray(files)) {
		if (files.length === 1) {
			files = glob.sync(path.normalize(files[0]));
		}

		files.forEach(function (file) {
			const info = path.parse(file);

			_handleFile(file, info, opts);
		});
	} else if (typeof files === 'string') {
		_handleFile(files, null, opts);
	}

}

module.exports = convert;
