/**
 * Outlines the class definition of a JSTree-compliant AST.
 * Not necessary, but it prevents from semantic errors during compilation.
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
}

export interface ClassLeftAssignment {
	computed: boolean;
	type: string;
	object: ClassObject;
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
