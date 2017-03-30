/*eslint dot-location: ["error", "property"]*/

const gulp = require('gulp');
const ts = require('gulp-typescript');
const typedoc = require('gulp-typedoc');
const eslint = require('gulp-eslint');
const tslint = require('gulp-tslint');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');

gulp.task('clean', function () {
    del('docs');

    return del('dist');
});

gulp.task('tslint', function () {
    return gulp.src(['**/*.ts', '!node_modules/**', '!dist/**', '!__test__/**', '!coverage/**', '!typings/**'])
        .pipe(tslint({
            formatter: 'verbose',
            typeCheck: true
        }))
        .pipe(tslint.report({
            summarizeFailureOutput: true
        }));
});

gulp.task('eslint', function () {
    return gulp.src(['*.js', '**/*.js', '!node_modules/**', '!dist/**', '!__test__/res/*.js', '!coverage/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
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

gulp.task('generators', ['eslint', 'tslint'], function () {
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

// gulp.task('convert', function () {
//     return gulp.src('test/res/*.js')
//         .pipe(convert({
//             verbose: true,
//             debug: true,
//             ctor: 'init'
//         }))
//         .pipe(gulp.dest('test/res/es6'));
// });

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
gulp.task('lint', ['eslint', 'tslint']);
gulp.task('default', ['scripts', 'doc']);
gulp.task('dist', ['scripts']);
