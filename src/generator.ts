import {Options} from "./options";

export class Generator {

	private options: Options;

	public constructor(public options: Options) {
		this.options = Object.assign({}, options);
		this.options.constructorName = this.options.constructorName || 'init';
	}

	/**
	 * Builds the beginning of the AST.
	 * @param namespace {string} The namespace of <code>$.Class</code>
	 * @returns {object} A ES2015 JSTree-compatible object that can be used for code generation.
	 */
	public static build(namespace: string): Object {
		if (!namespace) {
			throw new Error('A namespace must be defined.');
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
			Generator._createConstReference(ast.body, spaces[0]);
			Generator._handleChainedSpaces(ast.body, spaces);
		}

		return ast;
	}

	/**
	 * Builds AST objects for chained namespaces stemming from the root namespace.
	 * @param body {object[]} The body of the AST to append the variable declaration to.
	 * @param spaces {string[]} The namespace chain as an array including the root namespace.
	 * @private
	 */
	private static _handleChainedSpaces(body: Object[], spaces: string[]): void {
		let root = spaces.shift();

		spaces.forEach((space, index, source) => {
			let piece = source.slice(0, index + 1).join('.');

			body.push({
				type: "ExpressionStatement",
				expression: {
					type: "AssignmentExpression",
					operator: "=",
					left: {
						type: "MemberExpression",
						object: {
							type: "Identifier",
							name: root
						},
						property: {
							type: "Identifier",
							name: piece
						},
						computed: false
					},
					right: {
						type: "LogicalExpression",
						left: {
							type: "MemberExpression",
							object: {
								type: "Identifier",
								name: root
							},
							property: {
								type: "Identifier",
								name: piece
							},
							computed: false
						},
						operator: "||",
						right: {
							type: "ObjectExpression",
							properties: []
						}
					}
				}
			});
		});
	}

	/**
	 * Sets a <code>const</code> variable so we don't modify any subsequent static references in the code.
	 * @param body {object[]} The body of the AST to append the variable declaration to.
	 * @param space {string} The root namespace object after <code>window</code> (e.g. window.foo)
	 * @private
	 */
	private static _createConstReference(body: Object[], space: string): void {
		body.push({ // const foo = window.foo;
			type: "VariableDeclaration",
			declarations: [
				{
					type: "VariableDeclarator",
					id: {
						type: "Identifier",
						name: space
					},
					init: {
						type: "MemberExpression",
						object: {
							type: "Identifier",
							name: "window"
						},
						property: {
							type: "Identifier",
							name: space
						},
						computed: false
					}
				}
			],
			kind: "const"
		});
	}

}
