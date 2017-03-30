import { Types } from '../defs/Types';

export class StaticVariablesGenerator {

    public static build(target: string, variables: Object[], root: Object[], namespace: string): void {
        const spaces: string[] = namespace.split('.');
        const rootNS = spaces.shift();

        variables.forEach((variable: Object[]) => {
            const v: any = variable[0];
            const branch: any = {
                type: Types.ExpressionStatement,
                expression: { // namespace.foo._instance = undefined
                    type: Types.AssignmentExpression,
                    operator: '=',
                    left: {
                        type: Types.MemberExpression,
                        object: {
                            type: Types.MemberExpression,
                            object: {
                                type: Types.Identifier,
                                name: rootNS
                            },
                            property: {
                                type: Types.Identifier,
                                name: spaces.length > 1 ? spaces.join('.') : spaces[0]
                            },
                            computed: false
                        },
                        property: {
                            type: Types.Identifier,
                            name: v.key.name
                        },
                        computed: false
                    }
                }
            };

            if (spaces.length === 0) {
                delete branch.expression.left.object.object;
                delete branch.expression.left.object.property;

                branch.expression.left.object.type = Types.Identifier;
                branch.expression.left.object.name = rootNS;
            }

            if (v.value.type !== 'Literal') {
                branch.expression.right = v.value;
            } else {
                branch.expression.right = {
                    type: v.value.type,
                    value: v.value.value,
                    raw: v.value.raw
                };
            }

            root.push(branch);
        });
    }

}
