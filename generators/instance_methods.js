module.exports = {

	buildInstanceMethods: function (ast, root, options) {
		ast.properties.forEach((property, index, source) => {
			if (property.key.name === options.constructorName) {
				root.push(this._buildConstructor(property));
			} else {
				root.push({
					type: "MethodDefinition",
					computed: property.computed,
					key: {
						type: "Identifier",
						name: property.key.name
					},
					static: false,
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
	},

	_buildConstructor: function (property) {
		return {
			type: "MethodDefinition",
			computed: property.computed,
			key: {
				type: "Identifier",
				name: "constructor"
			},
			static: false,
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
		}
	}

};
