let doc: string = `
Usage:
	convert - [options]
	convert <src>... [options]
	
Arguments:
	<src> Path to your $.Class files
	
Options:
	-h, --help          Show help
	--version           Show the current version
	-v, --verbose       Enable verbose mode
	-d, --dest=<dir>    Where to output generated files
	--debug             Output debugging information
`;


export default function cli(argv = process.argv.slice(2)) {

	const VERSION: string = "1.0.0";

}
