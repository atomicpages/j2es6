module.exports = {

	buildStaticVars: function (vars, root, namespace) {
		this._namespace = namespace.split('.');
		let self = this;

		vars.forEach(function (variable, index, source) {
			variable = variable[0];
			let branch = {
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
								name: self._namespace[0]
							},
							property: {
								type: "Identifier",
								name: self._namespace.slice(1, self._namespace.length).join('.')
							},
							computed: false
						},
						property: {
							type: "Identifier",
							name: variable.key.name
						},
						computed: false
					}
				},
			};

			if (variable.value.type !== "Literal") {
				branch.expression.right = variable.value;
			} else {
				branch.expression.right = {
					type: variable.value.type,
					value: variable.value.value,
					raw: variable.value.raw
				};
			}

			root.push(branch);
		});
	}

};
