export class StaticVariablesGenerator {

	public static build(variables: Object[], root: Object[], namespace: string): void {
		let spaces: string[] = namespace.split('.');
		let rootNS = spaces.shift();

		variables.forEach((variable: Object[]) => {
			let v: any = variable[0];
			let branch: any = {
				type: "ExpressionStatement",
				expression: { // namespace.foo._instance = undefined
					type: "AssignmentExpression",
					operator: "=",
					left: {
						type: "MemberExpression",
						object: {
							type: "MemberExpression",
							object: {
								type: "Identifier",
								name: rootNS
							},
							property: {
								type: "Identifier",
								// Tsk, tsk, nested ternary operators!
								name: spaces.length > 1 ? spaces.join('.') : spaces[0]
							},
							computed: false
						},
						property: {
							type: "Identifier",
							name: v.key.name
						},
						computed: false
					}
				},
			};

			if (spaces.length === 0) {
				delete branch.expression.left.object.object;
				delete branch.expression.left.object.property;

				branch.expression.left.object.type = "Identifier";
				branch.expression.left.object.name = rootNS;
			}

			if (v.value.type !== "Literal") {
				branch.expression.right = v.value;
			} else {
				branch.expression.right = {
					type: v.value.type,
					value: v.value.value,
					raw: v.value.raw
				};
			}

			root.push(branch);
		});
	}

}
