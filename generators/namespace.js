const classes = require('./classes');

module.exports = {

	/**
	 * Takes in a namespace and outputs the proper JSTree-compatible structure suitable for code generation.
	 * @param namespace {string} The namespace to convert to an es6-compatible tree.
	 * @returns {object}
	 */
	buildNamespace: function (namespace) {
		if (!namespace) {
			throw new Error('Namespace cannot be undefined');
		}

		let spaces = namespace.split('.');

		let ast = {
			type: "Program",
			body: [
				{
					type: "ExpressionStatement",
					expression: { // window.foo = window.foo || {};
						type: "AssignmentExpression",
						operator: "=",
						left: { // window
							type: "MemberExpression",
							object: {
								type: "Identifier",
								name: "window"
							},
							property: { // .foo
								type: "Identifier",
								name: spaces[0]
							},
							computed: false
						},
						right: { // window.foo || {}
							type: "LogicalExpression",
							left: { // window.foo
								type: "MemberExpression",
								object: {
									type: "Identifier",
									name: "window"
								},
								property: {
									type: "Identifier",
									name: spaces[0]
								},
								computed: false
							},
							operator: "||",
							right: { // {}
								type: "ObjectExpression",
								properties: []
							}
						}
					}
				}
			]
		};

		if (spaces.length > 1) {
			ast.body.push({ // const foo = window.foo;
				type: "VariableDeclaration",
				declarations: [
					{
						type: "VariableDeclarator",
						id: {
							type: "Identifier",
							name: spaces[0]
						},
						init: {
							type: "MemberExpression",
							object: {
								type: "Identifier",
								name: "window"
							},
							property: {
								type: "Identifier",
								name: spaces[0]
							},
							computed: false
						}
					}
				],
				kind: "const"
			});
		}

		ast.body.push(classes.buildClassBody(spaces));

		return ast;
	}

};
