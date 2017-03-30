import { ClassGenerator } from '../src/generators/ClassGenerator';
import { ExtendedClassGenerator } from '../src/generators/ExtendedClassGenerator';

test('Class ExtendedClassGenerator is exported', () => {
    expect(ExtendedClassGenerator).toBeDefined();
    expect(ExtendedClassGenerator).toBeTruthy();
    // expect(ClassGenerator instanceof ClassGenerator).toBeTruthy();
});

test('Definition produces JSTree-compliant structure for extended classes', () => {
    let ast = ClassGenerator.build(['com', 'google', 'Utils']);
    ExtendedClassGenerator.build(ast, ['com', 'google', 'gmail', 'Utils']);

    expect(ast).toBeDefined();
    expect(ast).toBeTruthy();
    expect(ast).toEqual({
        expression: {
            left: {
                computed: false,
                object: {
                    name: "com",
                    type: "Identifier"
                },
                property: {
                    name: "google.Utils",
                    type: "Identifier"
                },
                type: "MemberExpression"
            },
            operator: "=",
            right: {
                body: {
                    body: [],
                    type: "ClassBody"
                },
                id: {
                    name: "Utils",
                    type: "Identifier"
                },
                superClass: {
                    object: {
                        computed: false,
                        object: {
                            computed: false,
                            object: {
                                name: "com",
                                type: "Identifier"
                            },
                            property: {
                                name: "google",
                                type: "Identifier"
                            },
                            type: "MemberExpression"
                        },
                        property: {
                            name: "gmail",
                            type: "Identifier"
                        },
                        type: "MemberExpression"
                    },
                    property: {
                        name: "Utils",
                        type: "Identifier"
                    },
                    type: "MemberExpression"
                },
                type: "ClassExpression"
            },
            type: "AssignmentExpression"
        },
        type: "ExpressionStatement"
    });

});
