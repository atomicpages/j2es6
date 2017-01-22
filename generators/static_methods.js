const static_vars = require('./static_vars');

module.exports = {

	buildStaticMethods: function (ast, root) {
		let staticVariables = [];

		ast.properties.forEach((property, index, array) => {
			if (property.value.type !== 'FunctionExpression') {
				staticVariables.push(array.slice(index, index + 1));
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

		return staticVariables;
	}

};
