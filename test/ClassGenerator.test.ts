import { ClassGenerator } from '../src/generators/ClassGenerator';

test('Definition produces JSTree-compliant structure', () => {
    const ast = ClassGenerator.build(['foo', 'bar']);

    expect(ast).toBeDefined();
    expect(ast).toBeTruthy();
    expect(ast).toEqual({
        type: 'ExpressionStatement',
        expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: {
                type: 'MemberExpression',
                object: {
                    type: 'Identifier',
                    name: 'foo'
                },
                property: {
                    type: 'Identifier',
                    name: 'bar'
                },
                computed: false
            },
            right: {
                type: 'ClassExpression',
                id: {
                    type: 'Identifier',
                    name: 'Bar'
                },
                superClass: null,
                body: {
                    type: 'ClassBody',
                    body: []
                }
            }
        }
    });
});

test('Definition produces JSTree-compliant structure with short namespace', () => {
    const ast = ClassGenerator.build(['foo']);

    expect(ast).toBeDefined();
    expect(ast).toBeTruthy();
    expect(ast).toEqual({
        type: 'ExpressionStatement',
        expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: {
                type: 'Identifier',
                name: 'foo',
                computed: false
            },
            right: {
                type: 'ClassExpression',
                id: {
                    type: 'Identifier',
                    name: 'Foo'
                },
                superClass: null,
                body: {
                    type: 'ClassBody',
                    body: []
                }
            }
        }
    });
});
