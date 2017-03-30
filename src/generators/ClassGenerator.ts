import { ClassDefinition } from '../typings/ClassDefinition';
import { Types } from '../defs/Types';

/**
 * Handles the creation of the class statement with namespace assignment.
 * @class
 */
export class ClassGenerator {

    /**
     * Converts the first letter of a string to a capital letter.
     * @param string {string} The string to process.
     * @returns {string}
     * @private
     */
    private static _ucfirst(string: string): string {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    /**
     * Builds a JSTree-compliant ES2015 class definition which can be appended to the main body of an AST.
     * @param namespace
     * @returns {object}
     */
    public static build(namespace: string[]): ClassDefinition {
        const root = namespace.shift();

        const ast: ClassDefinition = {
            type: Types.ExpressionStatement,
            expression: {
                type: Types.AssignmentExpression,
                operator: '=',
                left: {
                    type: Types.MemberExpression,
                    object: {
                        type: Types.Identifier,
                        name: root
                    },
                    computed: false
                },
                right: {
                    type: Types.ClassExpression,
                    id: {
                        type: Types.Identifier,
                        name: ClassGenerator._ucfirst(namespace.length > 0 ? namespace[namespace.length - 1] : root)
                    },
                    superClass: null,
                    body: {
                        type: Types.ClassBody,
                        body: []
                    }
                }
            }
        };

        if (namespace && namespace.length > 0) {
            ast.expression.left.property = {
                type: Types.Identifier,
                name: namespace.join('.')
            };
        } else {
            delete ast.expression.left;
            ast.expression.left = {
                type: Types.Identifier,
                name: root,
                computed: false
            };
        }

        return ast;
    }

}
