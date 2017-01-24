export class StaticVariablesGenerator  {

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
								name: spaces.join('.')
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
