const gulp = require('gulp');
const ts = require('gulp-typescript');
const typedoc = require('gulp-typedoc');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const del = require('del');
const convert = require('./index');

gulp.task('clean', function () {
	del('docs');
	return del('dist');
});

gulp.task('scripts', ['clean', 'generators'], function () {
	return gulp.src(['src/*.ts', 'src/convert.js'])
		.pipe(sourcemaps.init())
		.pipe(ts({
			noImplicitAny: true,
			module: 'commonjs',
			moduleResolution: 'node',
			target: 'ES5',
			allowJs: true
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist'));
});

gulp.task('generators', function () {
	return gulp.src('src/generators/*.ts')
		.pipe(sourcemaps.init())
		.pipe(ts({
			noImplicitAny: true,
			module: 'commonjs',
			moduleResolution: 'node',
			target: 'ES5'
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/generators'));
});

gulp.task('convert', function () {
	return gulp.src('test/res/*.js')
		.pipe(convert({
			verbose: true,
			debug: true,
			ctor: 'init'
		}))
		.pipe(gulp.dest('test/res/es6'))
});

gulp.task('doc', function () {
	gulp.src('src/*.ts')
		.pipe(typedoc({
			module: 'commonjs',
			target: 'es5',
			includeDeclarations: true,
			out: './docs',
			name: 'jQuery $.Class to ES2015 Classes',
			ignoreCompilerErrors: true,
			version: true
		}));
});

gulp.task('watch:generators', function () {
	return gulp.watch('src/generators/*.ts', ['generators']);
});

gulp.task('watch:scripts', function () {
	return gulp.watch(['src/*.ts', 'src/convert.js'], ['scripts']);
});

gulp.task('watch', ['watch:scripts', 'watch:generators']);

gulp.task('default', ['scripts', 'doc']);
