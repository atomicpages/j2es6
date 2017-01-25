const convert = require('../dist/convert');

/**
 * A simple CLI interface.
 * @param argv {object}
 */
export function cli(argv: any) {

	let options: any = {
		destination: argv.d,
		verbose: !!argv.v,
		debug: !!argv.debug
	};

	if (argv.ctor) options['ctor'] = argv.ctor;

	convert(argv._, options);
}
