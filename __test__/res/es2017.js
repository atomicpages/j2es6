$.Class('foo.namespace.demo', {
    STATIC_CONST_VAR: 20,
    _instance: undefined,

    instance: function () {
        if (!foo.namespace.subspace._instance) {
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
