import { Options } from "../typings/options";

export declare class Generator {

    /**
     * Builds the beginning of the AST.
     * @param parameters {Object[]} The namespace of <code>$.Class</code>
     * @param options {Options} The options passed by the consumer.
     * @returns {object} A ES2015 JSTree-compatible object that can be used for code generation.
     */
    static build(parameters: any[], options: Options): Object;

    /**
     * Builds AST objects for chained namespaces stemming from the root namespace.
     * For example, foo.bar.ns.Utils will produce:
     * <pre>
     *     foo.bar = foo.bar || {};
     *     foo.bar.ns = foo.bar.ns || {};
     * </pre>
     * @param body {object[]} The body of the AST to append the variable declaration to.
     * @param spaces {string[]} The namespace chain as an array including the root namespace.
     * @private
     */
    private static _handleChainedSpaces(body, spaces);

    /**
     * Sets a <code>const</code> variable so we don't modify any subsequent static references in the code.
     * @param body {object[]} The body of the AST to append the variable declaration to.
     * @param space {string} The root namespace object after <code>window</code> (e.g. window.foo)
     * @private
     */
    private static _createConstReference(body, space);
}
