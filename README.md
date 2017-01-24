# jQuery `$.Class` to ES6/ES2015 Classes

Code tightly coupled to jQuery? Using jQueryMX [class.js](https://github.com/jupiterjs/jquerymx/tree/master/class) and you want to make the migration to ES2015 classes? This project allows you to do so.

### What this Utility Does

Here is your source file:

~~~javascript
$.Class('foo.namespace.demo', {
	STATIC_VAR: 20,
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
		return JSON.stringify(this);
	}
});
~~~

here's your result:

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
		this._something  40;
	}
	
	toString() {
		return JSON.stringify(this);
	}
	
};

foo.namespace.demo.STATIC_VAR = 20;
foo.namespace.demo._instance = undefined;
~~~ 

### Limitations
This utility, at least at this time, does **not** account for reserved words in the `$.Class` name definition. This will break your code:

~~~javascript
$.Class('this.demo.Utils', { ... }, { ... });
~~~

In order for this to translate properly into a namespace we would need to do this during code generation:
 
~~~javascript
window['this'] = window['this'] || {};
const <insert_transformed_name_here> = window['this'];
...
~~~

This gets messy very quickly.

### How do I support legacy clients?
If you're already building your static resources with something like [gulp.js](http://gulpjs.com/), [grunt.js](http://gruntjs.com/), or [broccoli.js](http://broccolijs.com/) then you have a head start. Once your code is converted to ES2015 classes, you can [transcompile](https://en.wikipedia.org/wiki/Source-to-source_compiler) your ES2015 classes to a form that legacy clients support using a utility like [Babel](https://babeljs.io/) or [Traceur](https://github.com/google/traceur-compiler)

### Colophon
* [astring](https://github.com/davidbonnet/astring) by David Bonnet
* [acorn](https://github.com/ternjs/acorn) by Marijn Haverbeke


### TODO
* Support extending classes
* Add tests
* Migrate comments
* Provide better CLI interface
* Make a gulp plugin
* Setup CI
* Setup automated API docs
* Add tests and linting as part of the acceptance for a successful build on CI
