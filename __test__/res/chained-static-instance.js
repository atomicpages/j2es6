$.Class('foo.bar.demo', {
	_instance: undefined,

	instance() {
		if (!foo.bar.demo._instance) {
			foo.bar.demo._instance = new foo.bar.demo();
		}

		return foo.bar.demo._instance;
	}
}, {

	init: function () {
		console.log('Boo!');
	}

});
