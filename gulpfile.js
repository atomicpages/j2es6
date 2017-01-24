const gulp = require('gulp');
const ts = require('gulp-typescript');
const typedoc = require('gulp-typedoc');
const sourcemaps = require('gulp-sourcemaps');
const watch = require('gulp-watch');
const concat = require('gulp-concat');
const del = require('del');

gulp.task('clean', function () {
	del('docs');
	return del('dist');
});

gulp.task('scripts', ['clean', 'generators'], function () {
	return gulp.src('src/*.ts')
		.pipe(sourcemaps.init())
		.pipe(ts({
			noImplicitAny: true,
			module: 'commonjs',
			moduleResolution: 'node',
			target: 'ES5'
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

gulp.task('default', ['scripts', 'doc']);
