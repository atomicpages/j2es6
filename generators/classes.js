module.exports = {

	/**
	 * Converts the first letter of a string to a capital letter.
	 * @param string {string} The string to process.
	 * @returns {string}
	 * @private
	 */
	_ucfirst: function (string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	},

	buildClassBody: function (namespace) {
		return {
			type: "ExpressionStatement",
			expression: {
				type: "AssignmentExpression",
				operator: "=",
				left: {
					type: "MemberExpression",
					object: {
						type: "Identifier",
						name: namespace[0]
					},
					property: {
						type: "Identifier",
						name: namespace[1]
					},
					computed: false
				},
				right: {
					type: "ClassExpression",
					id: {
						type: "Identifier",
						name: this._ucfirst(namespace[namespace.length - 1])
					},
					superClass: null,
					body: {
						type: "ClassBody",
						body: []
					}
				}
			}
		};
	}

};
