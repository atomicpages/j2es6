/* tslint:disable:no-require-imports only-arrow-functions*/
const convert = require('./convert');

/**
 * A simple CLI interface.
 * @param argv {object}
 */
export function cli(argv: any) {

    const options: any = {
        destination: argv.d,
        verbose: !!argv.v,
        debug: !!argv.debug,
        ignore: argv.ignore,
        'ignore-pattern': argv['ignore-pattern']
    };

    if (argv.ctor) {
        options['ctor'] = argv.ctor;
    }

    convert(argv._, options);
}
