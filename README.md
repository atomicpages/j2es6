j2es6
=====

Otherwise known as jQuery `$.Class` to ES6/ES7 classes.

Code tightly coupled to jQuery? Using jQueryMX [class.js](https://github.com/jupiterjs/jquerymx/tree/master/class) and you want to make the migration to ES2015 or ES2017 classes? This project allows you to do so by converting your source code into an AST using [acorn](https://github.com/ternjs/acorn), creating a new AST based on your existing code, and doing code generation with [astring](https://github.com/davidbonnet/astring).

**Note:** This utility will _only_ run if the source file contains a jQuery MX `$.Class` function. Here's an example below:

~~~javascript
$.Class('foo.namespace.demo', {
	STATIC_CONST_VAR: 20,
	_instance: undefined,

	instance: function () {
		if(!foo.namespace.subspace._instance) {
			foo.namespace.subspace._instance = new foo.namespace.subspace();
		}

		return foo.namespace.subspace._instance;
	}
}, {
	/**
	 * Initializes the class.
	 * @constructor
	 */
	init: function () {
		this._special = 20;
		this._someting = 40;
	},

	/**
	 * Converts the singleton to a string.
	 * @return {string}
	 */
	toString: function () {
		return JSON.stringify(this, null, 4);
	}
});
~~~

and after running `j2es6`:

~~~javascript
window.foo = window.foo || {};
const foo = window.foo;
foo.namespace = foo.namespace || {};

foo.namespace.demo = class Demo {

	static instance() {
		if (!foo.namespace.demo._instance) {
			foo.namespace.demo._instance = new Demo();
		}

		return foo.namespace.demo._instance;
	}

	constructor() {
		this._special = 20;
		this._something = 40;
	}

	toString() {
		return JSON.stringify(this);
	}

};

foo.namespace.demo.STATIC_VAR = 20;
foo.namespace.demo._instance = undefined;
~~~

or, if you specify the target version as `es2017` then:

~~~js
window.foo = window.foo || {};
const foo = window.foo;
foo.namespace = foo.namespace || {};

foo.namespace.demo = class Demo {

    static STATIC_VAR = 20;
    static _instance = undefined;

    _special = 20;
    _something = 40;

    static instance() {
    		if (!Demo._instance) {
    			Demo._instance = new Demo();
    		}
    
    		return Demo._instance;
    	}

    	toString() {
    		return JSON.stringify(this);
    	}

}
~~~

### Installation
Installing can be done via NPM or Yarn:

~~~bash
npm install j2es6 --save-dev
yarn add j2es6 --dev
~~~

This plugin provides two interfaces:
1. CLI
2. Gulp

#### CLI
Accessing the CLI interface can be done by calling the `j2es6` command from your terminal window:

~~~bash
j2es6 --help
~~~

**Note:** command can be found `./node_modules/.bin/j2es6` if installed as a project dependency.

#### Gulp
Gulp-plugin included!

~~~javascript
const j2es6 = require('j2es6');

gulp.task('convert', function () {
	return gulp.src('path/to/classes/*.js')
		.pipe(j2es6())
		.pipe(gulp.dest('path/to/classes/es6'));
});
~~~


### Options
~~~
 Usage: bin/j2es6 <src> [options]
 
 Commands:
   <src>  Path of files to convert
 
 Options:
   -v, --verbose     Enable verbose mode                                [boolean]
   --debug           Enable debug mode                                  [boolean]
   --dest, -d        Where to store files after conversion. Use "console" to dump
                     data to the console. Use "stdout"  to write contents to
                     process.stdout.                                   [required]
   --target          The ECMAScript version you wish to generate
                                [choices: "es2015", "es2017"] [default: "es2015"]
   --ctor            The name of the constructor                [default: "init"]
   -i, --ignore      Ignores a specific set of files specified            [array]
   --ignore-pattern  Same as ignore, but with a ECMA-262-compliant RegExp pattern
   -h, --help        Show help                                          [boolean]
   --version         Show version number                                [boolean]
 
 Examples:
   bin/j2es6 myProj/js/*.js -d myProj/js/es6
 
 Copyright (c) 2017
~~~

### Limitations
1. This utility, at least at this time, does **not** account for reserved words in the `$.Class` name definition. This will break your code:

	~~~javascript
	$.Class('this.demo.Utils', { ... }, { ... });
	~~~

	In order for this to translate properly into a namespace we would need to do this during code generation:

	~~~javascript
	window['this'] = window['this'] || {};
	const <insert_gnarly_transformed_name_here> = window['this'];
	...
	~~~

	This gets messy very quickly.
2. Comments are not migrated at the moment. This is something that I'll be working on soon.
3. Files that contains a mix of `$.Class` definitions and other non-`$.Class` definitions won't generate properly. See this example:

	~~~javascript
	$.Class('foo.bar', {
		init: function () {
			console.log('Some fancy stuff');
		},

		demo: function () {
			let _demo = function () { // will get generated
				console.log('foo');
			};

			_demo();
		}
	});

	// Will NOT generate
	window.foo.bar.prototype.demo = function () {
		console.log('Hello');
	};
	~~~

	I do not have plans to implement support for this use case unless there is a need for it.

### How do I support legacy clients with my fancy ES2015 classes?
If you're already building your static resources with something like [gulp.js](http://gulpjs.com/), [grunt.js](http://gruntjs.com/), or [broccoli.js](http://broccolijs.com/) then you have a head start. Once your code is converted to ES2015 classes, you can [transcompile](https://en.wikipedia.org/wiki/Source-to-source_compiler) your ES2015 classes to a form that legacy clients support using a utility like [Babel](https://babeljs.io/) or [Traceur](https://github.com/google/traceur-compiler)

### Colophon
* [astring](https://github.com/davidbonnet/astring) by David Bonnet
* [acorn](https://github.com/ternjs/acorn) by Marijn Haverbeke
* [through2](https://github.com/rvagg/through2) by Rod Vagg
* [jest]() by Facebook Code
* [benchmark.js]()


### TODO
* ~~Support extending classes~~
* Add tests
* Migrate comments
* ~~Provide CLI interface~~
* ~~Make a gulp plugin~~
* Setup CI
* ~~Setup automated API docs~~
* Add tests and linting as part of the acceptance for a successful build on CI
* ~~Support instance methods~~
* Provide a means to format sourcecode (or at least a workaround)
* ~~Add support for ES2017~~
* ~~Add linting~~
