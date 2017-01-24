const fs = require('fs');
const path = require('path');
const convert = require('../index');

describe('generator', function () {

	// before(function () {
	// 	let files = fs.readdirSync('./res');
	// 	let map = {};
	//
	// 	files.forEach(function (file) {
	// 		let name = name.split(file.lastIndexOf(path.sep)).pop();
	// 		map[name] = fs.readFileSync(file).toString();
	// 	});
	// });

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
