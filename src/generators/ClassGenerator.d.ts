import { ClassDefinition } from '../typings/ClassDefinition';

/**
 * Handles the creation of the class statement with namespace assignment.
 * @class
 */
export declare class ClassGenerator {

    /**
     * Converts the first letter of a string to a capital letter.
     * @param string {string} The string to process.
     * @returns {string}
     * @private
     */
    // tslint:disable-next-line:no-unused-variable
    private static _ucfirst(string: string): string;

    /**
     * Builds a JSTree-compliant ES2015 class definition which can be appended to the main body of an AST.
     * @param namespace
     * @returns {object}
     */
    public static build(namespace: string[]): ClassDefinition;
}
