export class StaticMethodGenerator {

	public static build(ast: any, root: Object[], namespace: string[]): Object[] {
		let staticVars: Object[] = [];

		ast.properties.forEach((property: any, index: number, array: Object[]) => {
			if (property.value.type !== 'FunctionExpression') {
				staticVars.push(array.slice(index, index + 1));
			} else {
				root.push({
					type: "MethodDefinition",
					computed: property.computed,
					key: {
						type: "Identifier",
						name: property.key.name
					},
					"static": true,
					kind: "method",
					value: {
						type: "FunctionExpression",
						id: property.value.id,
						generator: !!property.value.generator,
						expression: !!property.value.expression,
						params: property.value.params,
						async: !!property.value.async,
						body: property.value.body
					}
				});
			}
		});

		return staticVars;
	}

}
