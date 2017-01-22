window.infaw = window.infaw || {};
const infaw = window.infaw;

infaw.namespace = class namespace {

	static instance() {
		if (!infaw.namespace._instance) {
			infaw.namespace._instance = new namespace(null, '');
		}

		return infaw.namespace._instance;
	}

	/**
	 * Initializes stuff.
	 * @param {JQuery} elem The element to attach to.
	 * @param {string} id The id of the element.
	 */
	constructor(elem, id) {
		this._element = elem;
		this._id = id;
	}

};

infaw.namespace.PAGE_SIZE = 20;
infaw.namespace._instance = undefined;
