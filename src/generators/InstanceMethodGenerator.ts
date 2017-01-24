import {Options} from "../typings/options";

export class InstanceMethodGenerator {

	private static _ctorGenerated: boolean = false;

	/**
	 *
	 * @param ast
	 * @param root
	 * @param options {Options} The name of the constructor.
	 */
	public static build(ast: any, root: Object[], options: Options) {
		ast.properties.forEach((property: any) => {
			if (property.key.name === options.constructorName && !InstanceMethodGenerator._ctorGenerated) {
				root.push(this._buildConstructor(property));
			} else {
				root.push({
					type: "MethodDefinition",
					computed: property.computed,
					key: {
						type: "Identifier",
						name: property.key.name
					},
					"static": false,
					kind: "method",
					value: {
						type: "FunctionExpression",
						id: property.value.id,
						generator: !!property.value.generator,
						expression: !!property.value.expression,
						async: !!property.value.async,
						params: property.value.params,
						body: property.value.body
					}
				})
			}
		});
	}

	private static _buildConstructor(property: any): Object {
		InstanceMethodGenerator._ctorGenerated = true;

		return {
			type: "MethodDefinition",
			computed: property.computed,
			key: {
				type: "Identifier",
				name: "constructor"
			},
			"static": false,
			kind: "constructor",
			value: {
				type: "FunctionExpression",
				id: property.value.id,
				generator: !!property.value.generator,
				expression: !!property.value.expression,
				async: !!property.value.async,
				params: property.value.params,
				body: property.value.body
			}
		};
	}

}
