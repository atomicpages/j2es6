const gulp = require('gulp');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const watch = require('gulp-watch');
const del = require('del');

gulp.task('clean', function () {
	return del('dist');
});

gulp.task('scripts', ['clean'], function () {
	return gulp.src('src/*.ts')
		.pipe(sourcemaps.init())
		.pipe(ts({
			noImplicitAny: true,
			module: 'commonjs'
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist'));
});

gulp.task('default', ['scripts']);
