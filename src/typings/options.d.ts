/**
 * All options available for this module.
 * @interface
 */
export interface Options {

    /**
     * An optional parameter that sets the name of the constructor. By default, this value will be
     * 'init', but other usages of <code>$.Class</code> may have a different modifier for the constructor.
     */
    constructorName?: string;

    /**
     * The location where to output the generated files.
     */
    destination?: string;

    /**
     * Set true to indicate the class is extending some other class.
     */
    extended?: boolean;

    /**
     * Required IFF extended is set true.
     */
    extendedNamespace?: string[];

    /**
     * A list of files to ignore.
     */
    ignore?: string[];

    /**
     * A pattern to ignore.
     */
    ignorePattern?: RegExp | string;

    /**
     * Where to place the output. Expecting console or file.
     */
    output?: string;

    /**
     * The target version of ECMAScript to produce. Defaults to <code>es2015</code>.
     */
    target: string;

}
