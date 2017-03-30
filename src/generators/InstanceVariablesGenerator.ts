export class InstanceVariablesGenerator {

    public static build(target: string, variables: Object[], root: any[]): void {
        for (let i = 0; i < variables.length; i++) {
            const variable: any = variables[i];

            root.push(target === 'es2015'
                ? InstanceVariablesGenerator._buildES6(variable)
                : InstanceVariablesGenerator._buildES7(variable));
        }
    }

    private static _buildES6(variable: any) {
        return {
            type: 'ExpressionStatement',
            expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                    type: 'MemberExpression',
                    object: { type: 'ThisExpression' },
                    property: variable.key
                },
                right: variable.value
            }
        };
    }

    private static _buildES7(variable: any) {
        return {
            type: 'ClassProperty',
            static: false,
            key: {
                type: 'Identifier',
                name: variable.key
            },
            value: {
                type: 'Literal',
                value: variable.value,
                rawValue: variable.value
            }
        };
    }

}
