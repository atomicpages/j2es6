"use strict";
var Generator = (function () {
    function Generator(options) {
        this.options = options;
        this.options = Object.assign({}, options);
        this.options.constructorName = this.options.constructorName || 'init';
    }
    /**
     * Builds the beginning of the AST.
     * @param namespace {string} The namespace of <code>$.Class</code>
     * @returns {object} A ES2015 JSTree-compatible object that can be used for code generation.
     */
    Generator.build = function (namespace) {
        if (!namespace) {
            throw new Error('A namespace must be defined.');
        }
        var spaces = namespace.split('.');
        var ast = {
            type: "Program",
            body: [
                {
                    type: "ExpressionStatement",
                    expression: {
                        type: "AssignmentExpression",
                        operator: "=",
                        left: {
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
                        right: {
                            type: "LogicalExpression",
                            left: {
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
                            right: {
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
    };
    /**
     * Builds AST objects for chained namespaces stemming from the root namespace.
     * @param body {object[]} The body of the AST to append the variable declaration to.
     * @param spaces {string[]} The namespace chain as an array including the root namespace.
     * @private
     */
    Generator._handleChainedSpaces = function (body, spaces) {
        var root = spaces.shift();
        spaces.forEach(function (space, index, source) {
            var piece = source.slice(0, index + 1).join('.');
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
    };
    /**
     * Sets a <code>const</code> variable so we don't modify any subsequent static references in the code.
     * @param body {object[]} The body of the AST to append the variable declaration to.
     * @param space {string} The root namespace object after <code>window</code> (e.g. window.foo)
     * @private
     */
    Generator._createConstReference = function (body, space) {
        body.push({
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
    };
    return Generator;
}());
exports.Generator = Generator;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUFRO3lCQUNkO3dCQUNELFFBQVEsRUFBRTs0QkFDVCxJQUFJLEVBQUUsWUFBWTs0QkFDbEIsSUFBSSxFQUFFLEtBQUs7eUJBQ1g7d0JBQ0QsUUFBUSxFQUFFLEtBQUs7cUJBQ2Y7aUJBQ0Q7YUFDRDtZQUNELElBQUksRUFBRSxPQUFPO1NBQ2IsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVGLGdCQUFDO0FBQUQsQ0FsS0EsQUFrS0MsSUFBQTtBQWxLWSw4QkFBUyIsImZpbGUiOiJnZW5lcmF0b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge09wdGlvbnN9IGZyb20gXCIuL29wdGlvbnNcIjtcblxuZXhwb3J0IGNsYXNzIEdlbmVyYXRvciB7XG5cblx0cHJpdmF0ZSBvcHRpb25zOiBPcHRpb25zO1xuXG5cdHB1YmxpYyBjb25zdHJ1Y3RvcihwdWJsaWMgb3B0aW9uczogT3B0aW9ucykge1xuXHRcdHRoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMpO1xuXHRcdHRoaXMub3B0aW9ucy5jb25zdHJ1Y3Rvck5hbWUgPSB0aGlzLm9wdGlvbnMuY29uc3RydWN0b3JOYW1lIHx8ICdpbml0Jztcblx0fVxuXG5cdC8qKlxuXHQgKiBCdWlsZHMgdGhlIGJlZ2lubmluZyBvZiB0aGUgQVNULlxuXHQgKiBAcGFyYW0gbmFtZXNwYWNlIHtzdHJpbmd9IFRoZSBuYW1lc3BhY2Ugb2YgPGNvZGU+JC5DbGFzczwvY29kZT5cblx0ICogQHJldHVybnMge29iamVjdH0gQSBFUzIwMTUgSlNUcmVlLWNvbXBhdGlibGUgb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgZm9yIGNvZGUgZ2VuZXJhdGlvbi5cblx0ICovXG5cdHB1YmxpYyBzdGF0aWMgYnVpbGQobmFtZXNwYWNlOiBzdHJpbmcpOiBPYmplY3Qge1xuXHRcdGlmICghbmFtZXNwYWNlKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0EgbmFtZXNwYWNlIG11c3QgYmUgZGVmaW5lZC4nKTtcblx0XHR9XG5cblx0XHRsZXQgc3BhY2VzID0gbmFtZXNwYWNlLnNwbGl0KCcuJyk7XG5cblx0XHRsZXQgYXN0ID0ge1xuXHRcdFx0dHlwZTogXCJQcm9ncmFtXCIsXG5cdFx0XHRib2R5OiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0eXBlOiBcIkV4cHJlc3Npb25TdGF0ZW1lbnRcIixcblx0XHRcdFx0XHRleHByZXNzaW9uOiB7IC8vIHdpbmRvdy5mb28gPSB3aW5kb3cuZm9vIHx8IHt9O1xuXHRcdFx0XHRcdFx0dHlwZTogXCJBc3NpZ25tZW50RXhwcmVzc2lvblwiLFxuXHRcdFx0XHRcdFx0b3BlcmF0b3I6IFwiPVwiLFxuXHRcdFx0XHRcdFx0bGVmdDogeyAvLyB3aW5kb3dcblx0XHRcdFx0XHRcdFx0dHlwZTogXCJNZW1iZXJFeHByZXNzaW9uXCIsXG5cdFx0XHRcdFx0XHRcdG9iamVjdDoge1xuXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiSWRlbnRpZmllclwiLFxuXHRcdFx0XHRcdFx0XHRcdG5hbWU6IFwid2luZG93XCJcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0cHJvcGVydHk6IHsgLy8gLmZvb1xuXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiSWRlbnRpZmllclwiLFxuXHRcdFx0XHRcdFx0XHRcdG5hbWU6IHNwYWNlc1swXVxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRjb21wdXRlZDogZmFsc2Vcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRyaWdodDogeyAvLyB3aW5kb3cuZm9vIHx8IHt9XG5cdFx0XHRcdFx0XHRcdHR5cGU6IFwiTG9naWNhbEV4cHJlc3Npb25cIixcblx0XHRcdFx0XHRcdFx0bGVmdDogeyAvLyB3aW5kb3cuZm9vXG5cdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJNZW1iZXJFeHByZXNzaW9uXCIsXG5cdFx0XHRcdFx0XHRcdFx0b2JqZWN0OiB7XG5cdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcIklkZW50aWZpZXJcIixcblx0XHRcdFx0XHRcdFx0XHRcdG5hbWU6IFwid2luZG93XCJcblx0XHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRcdHByb3BlcnR5OiB7XG5cdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcIklkZW50aWZpZXJcIixcblx0XHRcdFx0XHRcdFx0XHRcdG5hbWU6IHNwYWNlc1swXVxuXHRcdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdFx0Y29tcHV0ZWQ6IGZhbHNlXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdG9wZXJhdG9yOiBcInx8XCIsXG5cdFx0XHRcdFx0XHRcdHJpZ2h0OiB7IC8vIHt9XG5cdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJPYmplY3RFeHByZXNzaW9uXCIsXG5cdFx0XHRcdFx0XHRcdFx0cHJvcGVydGllczogW11cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XVxuXHRcdH07XG5cblx0XHRpZiAoc3BhY2VzLmxlbmd0aCA+IDEpIHtcblx0XHRcdEdlbmVyYXRvci5fY3JlYXRlQ29uc3RSZWZlcmVuY2UoYXN0LmJvZHksIHNwYWNlc1swXSk7XG5cdFx0XHRHZW5lcmF0b3IuX2hhbmRsZUNoYWluZWRTcGFjZXMoYXN0LmJvZHksIHNwYWNlcyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGFzdDtcblx0fVxuXG5cdC8qKlxuXHQgKiBCdWlsZHMgQVNUIG9iamVjdHMgZm9yIGNoYWluZWQgbmFtZXNwYWNlcyBzdGVtbWluZyBmcm9tIHRoZSByb290IG5hbWVzcGFjZS5cblx0ICogQHBhcmFtIGJvZHkge29iamVjdFtdfSBUaGUgYm9keSBvZiB0aGUgQVNUIHRvIGFwcGVuZCB0aGUgdmFyaWFibGUgZGVjbGFyYXRpb24gdG8uXG5cdCAqIEBwYXJhbSBzcGFjZXMge3N0cmluZ1tdfSBUaGUgbmFtZXNwYWNlIGNoYWluIGFzIGFuIGFycmF5IGluY2x1ZGluZyB0aGUgcm9vdCBuYW1lc3BhY2UuXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRwcml2YXRlIHN0YXRpYyBfaGFuZGxlQ2hhaW5lZFNwYWNlcyhib2R5OiBPYmplY3RbXSwgc3BhY2VzOiBzdHJpbmdbXSk6IHZvaWQge1xuXHRcdGxldCByb290ID0gc3BhY2VzLnNoaWZ0KCk7XG5cblx0XHRzcGFjZXMuZm9yRWFjaCgoc3BhY2UsIGluZGV4LCBzb3VyY2UpID0+IHtcblx0XHRcdGxldCBwaWVjZSA9IHNvdXJjZS5zbGljZSgwLCBpbmRleCArIDEpLmpvaW4oJy4nKTtcblxuXHRcdFx0Ym9keS5wdXNoKHtcblx0XHRcdFx0dHlwZTogXCJFeHByZXNzaW9uU3RhdGVtZW50XCIsXG5cdFx0XHRcdGV4cHJlc3Npb246IHtcblx0XHRcdFx0XHR0eXBlOiBcIkFzc2lnbm1lbnRFeHByZXNzaW9uXCIsXG5cdFx0XHRcdFx0b3BlcmF0b3I6IFwiPVwiLFxuXHRcdFx0XHRcdGxlZnQ6IHtcblx0XHRcdFx0XHRcdHR5cGU6IFwiTWVtYmVyRXhwcmVzc2lvblwiLFxuXHRcdFx0XHRcdFx0b2JqZWN0OiB7XG5cdFx0XHRcdFx0XHRcdHR5cGU6IFwiSWRlbnRpZmllclwiLFxuXHRcdFx0XHRcdFx0XHRuYW1lOiByb290XG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0cHJvcGVydHk6IHtcblx0XHRcdFx0XHRcdFx0dHlwZTogXCJJZGVudGlmaWVyXCIsXG5cdFx0XHRcdFx0XHRcdG5hbWU6IHBpZWNlXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0Y29tcHV0ZWQ6IGZhbHNlXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRyaWdodDoge1xuXHRcdFx0XHRcdFx0dHlwZTogXCJMb2dpY2FsRXhwcmVzc2lvblwiLFxuXHRcdFx0XHRcdFx0bGVmdDoge1xuXHRcdFx0XHRcdFx0XHR0eXBlOiBcIk1lbWJlckV4cHJlc3Npb25cIixcblx0XHRcdFx0XHRcdFx0b2JqZWN0OiB7XG5cdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJJZGVudGlmaWVyXCIsXG5cdFx0XHRcdFx0XHRcdFx0bmFtZTogcm9vdFxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRwcm9wZXJ0eToge1xuXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiSWRlbnRpZmllclwiLFxuXHRcdFx0XHRcdFx0XHRcdG5hbWU6IHBpZWNlXG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdGNvbXB1dGVkOiBmYWxzZVxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdG9wZXJhdG9yOiBcInx8XCIsXG5cdFx0XHRcdFx0XHRyaWdodDoge1xuXHRcdFx0XHRcdFx0XHR0eXBlOiBcIk9iamVjdEV4cHJlc3Npb25cIixcblx0XHRcdFx0XHRcdFx0cHJvcGVydGllczogW11cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldHMgYSA8Y29kZT5jb25zdDwvY29kZT4gdmFyaWFibGUgc28gd2UgZG9uJ3QgbW9kaWZ5IGFueSBzdWJzZXF1ZW50IHN0YXRpYyByZWZlcmVuY2VzIGluIHRoZSBjb2RlLlxuXHQgKiBAcGFyYW0gYm9keSB7b2JqZWN0W119IFRoZSBib2R5IG9mIHRoZSBBU1QgdG8gYXBwZW5kIHRoZSB2YXJpYWJsZSBkZWNsYXJhdGlvbiB0by5cblx0ICogQHBhcmFtIHNwYWNlIHtzdHJpbmd9IFRoZSByb290IG5hbWVzcGFjZSBvYmplY3QgYWZ0ZXIgPGNvZGU+d2luZG93PC9jb2RlPiAoZS5nLiB3aW5kb3cuZm9vKVxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0cHJpdmF0ZSBzdGF0aWMgX2NyZWF0ZUNvbnN0UmVmZXJlbmNlKGJvZHk6IE9iamVjdFtdLCBzcGFjZTogc3RyaW5nKTogdm9pZCB7XG5cdFx0Ym9keS5wdXNoKHsgLy8gY29uc3QgZm9vID0gd2luZG93LmZvbztcblx0XHRcdHR5cGU6IFwiVmFyaWFibGVEZWNsYXJhdGlvblwiLFxuXHRcdFx0ZGVjbGFyYXRpb25zOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHR0eXBlOiBcIlZhcmlhYmxlRGVjbGFyYXRvclwiLFxuXHRcdFx0XHRcdGlkOiB7XG5cdFx0XHRcdFx0XHR0eXBlOiBcIklkZW50aWZpZXJcIixcblx0XHRcdFx0XHRcdG5hbWU6IHNwYWNlXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRpbml0OiB7XG5cdFx0XHRcdFx0XHR0eXBlOiBcIk1lbWJlckV4cHJlc3Npb25cIixcblx0XHRcdFx0XHRcdG9iamVjdDoge1xuXHRcdFx0XHRcdFx0XHR0eXBlOiBcIklkZW50aWZpZXJcIixcblx0XHRcdFx0XHRcdFx0bmFtZTogXCJ3aW5kb3dcIlxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdHByb3BlcnR5OiB7XG5cdFx0XHRcdFx0XHRcdHR5cGU6IFwiSWRlbnRpZmllclwiLFxuXHRcdFx0XHRcdFx0XHRuYW1lOiBzcGFjZVxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdGNvbXB1dGVkOiBmYWxzZVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XSxcblx0XHRcdGtpbmQ6IFwiY29uc3RcIlxuXHRcdH0pO1xuXHR9XG5cbn1cbiJdfQ==
