/**
 * Sample class
 * @class
 */
$.Class('infaw.namespace', {
	PAGE_SIZE: 20,
	_instance: undefined,

	instance: function () {
		if (!infaw.namespace._instance) {
			infaw.namespace._instance = new infaw.namespace();
		}

		return infaw.namespace._instance;
	}
}, {

	/**
	 * Initializes stuff.
	 * @param {JQuery} elem The element to attach to.
	 * @param {string} id The id of the element.
	 */
	init: function (elem, id) {
		this._element = elem;
		this._id = id;
	},

	foo: function (bar) {
		return bar ? infaw.namespace.PAGE_SIZE : 0;
	}

});
