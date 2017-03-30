$.Class('foo.demo', {

	_foo: undefined,

	special: function () {
		if (this._foo) console.log(this._foo);
	}

});
