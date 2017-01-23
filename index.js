const fs = require('fs');
const acorn = require('acorn');
const astring = require('astring');
const traverse = require('ast-traverse');

const Generator = require('./dist/generator').Generator;

function convert(options) {

	const defaultOptions = {
		constructorName: 'init'
	};

	const OPTIONS = Object.assign({}, defaultOptions, options);

	'use strict';

	fs.readFile('./demo.jquery.js', (err, content) => {
		let ast = acorn.parse(content.toString(), {
			sourceType: 'script',
			ranges: true
			// onComment: function (block, text, start, end) {} // TODO: extract comments and add them to ES6
		});

		console.log(content.toString() + '\n');

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

						console.log(code);
					}
				}
			}
		});
	});

}

module.exports = convert;

convert();
