export class InstanceVariablesGenerator {

	public static build(variables: Object[], root: any[]): void {
		variables.forEach((variable: any) => {
			root.push({
				type: "ExpressionStatement",
				expression: {
					type: "AssignmentExpression",
					operator: "=",
					left: {
						type: "MemberExpression",
						object: { type: "ThisExpression" },
						property: variable.key
					},
					right: variable.value
				}
			});
		});
	}

}
