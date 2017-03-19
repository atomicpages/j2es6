/**
 * Outlines the class definition of a JSTree-compliant AST.
 * Not necessary, but it prevents semantic errors during compilation.
 * @since 1.0.0
 */
export interface ClassDefinition {
    type: string;
    expression: ClassExpression;
}

export interface ClassExpression {
    left: ClassLeftAssignment;
    right: ClassRightAssignment;
    operator: string;
    type: string;
    superClass?: SuperClass;
}

export interface SuperClass {
    type: string;
    object: ClassLeftAssignment | ClassObject;
    property: ClassProperty;
    computed: boolean;
}

export interface ClassLeftAssignment {
    computed: boolean;
    type: string;
    object?: ClassObject;
    name?: string;
    property?: ClassProperty;
}

export interface ClassRightAssignment {
    superClass: Object;
    type: string;
    id: ClassId;
    body: ClassBody;
}

export interface ClassId {
    name: string;
    type: string;
}

export interface ClassBody {
    type: string;
    body: Object[];
}

export interface ClassObject {
    name: string;
    type: string;
}

export interface ClassProperty {
    name: string;
    type: string;
}
