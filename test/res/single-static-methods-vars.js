$.Class('demo', {
	_instance: undefined,

	instance() {
		if (!demo._instance) {
			demo._instance = new demo();
		}

		return demo._instance;
	}
}, {});
