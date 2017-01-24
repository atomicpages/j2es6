const path = require('path');
const fs = require('fs');
const acorn = require('acorn');
const astring = require('astring');
const traverse = require('ast-traverse');

const Generator = require('../dist/generator').Generator;

/**
 * Kicks off the conversion process.
 * @param files {string[]} The array of files to process.
 * @param options {object}
 */
function convert (files, options) {

	const defaultOptions = {
		constructorName: 'init',
		output: 'console',
		destination: '.'
	};

	const OPTIONS = Object.assign({}, defaultOptions, options);

	'use strict';

	files.forEach(file => {
		const info = path.parse(file);
		const name = info.name + info.ext;

		fs.readFile(file, (err, content) => {
			let ast = acorn.parse(content.toString(), {
				sourceType: 'script',
				ranges: true
				// onComment: function (block, text, start, end) {} // TODO: extract comments and add them to ES6
			});

			// console.log(content.toString() + '\n');

			traverse(ast, {
				pre: (node, parent, prop, idx) => {
					if (node.type === 'MemberExpression') {
						if (node.object
							&& node.object.type === 'Identifier'
							&& node.object.name === '$'
							&& node.property
							&& node.property.type === 'Identifier'
							&& node.property.name === 'Class') {
							let code = astring(Generator.build(parent.arguments, OPTIONS));

							if (OPTIONS.output === 'console') {
								console.log(code);
							} else {
								fs.writeFile(OPTIONS.destination + '/' + info.name + '.es6' + info.ext, code, {mode: 0o644}, err => {
									if (err) {
										throw new Error(JSON.stringify(err));
									}

									console.info('Wrote file ' + file);
								});
							}
						}
					}
				}
			});
		});
	});

}

module.exports = convert;
