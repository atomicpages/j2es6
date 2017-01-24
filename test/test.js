const fs = require('fs');
const path = require('path');
const convert = require('../src/convert');

describe('generator', function () {

	describe('#build', function () {
		it('foo', function () {
			convert(fs.readdirSync(__dirname + '/res'), {
				output: 'file',
				destination: __dirname + '/res/generated'
			});
		})
	});

	after(function () {

	});

});
