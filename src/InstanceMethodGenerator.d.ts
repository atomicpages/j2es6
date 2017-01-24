import { Options } from "./typings/options";

export declare class InstanceMethodGenerator {

    private static _ctorGenerated;

    /**
     *
     * @param ast
     * @param root
     * @param options {Options} The name of the constructor.
     */
    static build(ast: any, root: Object[], options: Options): void;

    private static _buildConstructor(property);
}
