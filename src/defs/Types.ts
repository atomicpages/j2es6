/**
 * List of all types used for AST generation.
 * @class
 */
export abstract class Types {

    public static readonly Program: string = 'Program';

    public static readonly FunctionDeclaration: string = 'FunctionDeclaration';

    public static readonly VariableDeclaration: string = 'VariableDeclaration';

    public static readonly StringLiteral: string = 'StringLiteral';

    public static readonly NumericLiteral: string = 'NumericLiteral';

    public static readonly BooleanLiteral: string = 'BooleanLiteral';

    public static readonly NullLiteral: string = 'NullLiteral';

    public static readonly RegExpLiteral: string = 'RegExpLiteral';

    public static readonly ObjectProperty: string = 'ObjectProperty';

    public static readonly ObjectMethod: string = 'ObjectMethod';

    public static readonly FunctionExpression: string = 'FunctionExpression';

    public static readonly UnaryExpression: string = 'UnaryExpression';

    public static readonly BinaryExpression: string = 'BinaryExpression';

    public static readonly AssignmentOperator: string = 'AssignmentOperator';

    public static readonly BinaryOperator: string = 'BinaryOperator';

    public static readonly AssignmentExpression: string = 'AssignmentExpression';

    public static readonly UpdateExpression: string = 'UpdateExpression';

    public static readonly LogicalOperator: string = 'LogicalOperator';

    public static readonly MemberExpression: string = 'MemberExpression';

    public static readonly BindExpression: string = 'BindExpression';

    public static readonly LogicalExpression: string = 'LogicalExpression';

    public static readonly ConditionalExpression: string = 'ConditionalExpression';

    public static readonly CallExpression: string = 'CallExpression';

    public static readonly NewExpression: string = 'NewExpression';

    public static readonly SequenceExpression: string = 'SequenceExpression';

    public static readonly Identifier: string = 'Identifier';

    public static readonly ExpressionStatement: string = 'ExpressionStatement';

    public static readonly BlockStatement: string = 'BlockStatement';

    public static readonly EmptyStatement: string = 'EmptyStatement';

    public static readonly DebuggerStatement: string = 'DebuggerStatement';

    public static readonly WithStatement: string = 'WithStatement';

    public static readonly ReturnStatement: string = 'ReturnStatement';

    public static readonly LabeledStatement: string = 'LabeledStatement';

    public static readonly BreakStatement: string = 'BreakStatement';

    public static readonly ContinueStatement: string = 'ContinueStatement';

    public static readonly IfStatement: string = 'IfStatement';

    public static readonly SwitchStatement: string = 'SwitchStatement';

    public static readonly SwitchCase: string = 'SwitchCase';

    public static readonly ThrowStatement: string = 'ThrowStatement';

    public static readonly TryStatement: string = 'TryStatement';

    public static readonly CatchClause: string = 'CatchClause';

    public static readonly WhileStatement: string = 'WhileStatement';

    public static readonly DoWhileStatement: string = 'DoWhileStatement';

    public static readonly ForStatement: string = 'ForStatement';

    public static readonly ForInStatement: string = 'ForInStatement';

    public static readonly ForOfStatement: string = 'ForOfStatement';

    public static readonly VariableDeclarator: string = 'VariableDeclarator';

    public static readonly Decorator: string = 'Decorator';

    public static readonly Directive: string = 'Directive';

    public static readonly DirectiveLiteral: string = 'DirectiveLiteral';

    public static readonly Super: string = 'Super';

    public static readonly Import: string = 'Import';

    public static readonly ThisExpression: string = 'ThisExpression';

    public static readonly ArrowFunctionExpression: string = 'ArrowFunctionExpression';

    public static readonly YieldExpression: string = 'YieldExpression';

    public static readonly AwaitExpression: string = 'AwaitExpression';

    public static readonly ArrayExpression: string = 'ArrayExpression';

    public static readonly ObjectExpression: string = 'ObjectExpression';

    public static readonly ObjectMember: string = 'ObjectMember';

    public static readonly Class: string = 'Class';

    public static readonly ClassBody: string = 'ClassBody';

    public static readonly ClassMethod: string = 'ClassMethod';

    public static readonly ClassProperty: string = 'ClassProperty';

    public static readonly ClassDeclaration: string = 'ClassDeclaration';

    public static readonly ClassExpression: string = 'ClassExpression';

}
