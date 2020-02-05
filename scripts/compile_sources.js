var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    ver = require('gulp-ver'),
    esdoc = require("gulp-esdoc"),
    clean = require('gulp-clean'),
    babel = require('gulp-babel'),
    browserify = require('gulp-browserify'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require("gulp-rename"),
    entryClient = 'opengate-api-bower.js',
    entryServer = 'opengate-api-npm.js',
    src = [entryServer, 'src/**/*.js'],
    srcOption = {
        base: './'
    },
    dest = './dist';

gulp.task('clean', function() {
    return gulp.src(dest, {
            read: false
        })
        .pipe(clean({
            force: true
        }));
});

gulp.task('clean-doc', function() {
    return gulp.src(['./documentation'], {
            allowEmpty: true,
            read: false
        })
        .pipe(clean({
            force: true
        }));
});


gulp.task('esdoc', function() {
    return gulp.src('.')
        .pipe(esdoc());
});

gulp.task('generate-doc', gulp.series('clean-doc', 'esdoc'));


gulp.task('npm', function() {
    return gulp.src(src, srcOption)
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write('.', {
            includeContent: false,
            sourceRoot: '..'
        }))
        .pipe(gulp.dest(dest));
});

gulp.task('bower', function() {
    return gulp.src(entryClient, srcOption)
        .pipe(sourcemaps.init())
        .pipe(browserify({
            insertGlobals: true,
            debug: gulp.env && !gulp.env.production,
            transform: ['babelify']
        }))
        .pipe(ver())
        .pipe(sourcemaps.write('.', {
            includeContent: false,
            sourceRoot: '..'
        }))

    .pipe(gulp.dest(dest));
});

gulp.task('bower:min', function() {
    return gulp.src(entryClient, srcOption)
        .pipe(sourcemaps.init())
        .pipe(browserify({
            insertGlobals: false,
            debug: false,
            transform: ['babelify']
        }))
        .pipe(uglify())
        .pipe(ver())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(sourcemaps.write('.', {
            includeContent: false,
            sourceRoot: '..'
        }))
        .pipe(gulp.dest(dest));
});


gulp.task('compile', gulp.series('clean', 'npm', 'bower', 'bower:min'));

gulp.task('build', gulp.series('compile', 'generate-doc'));


gulp.task('watch-src', function(done) {
    gulp.watch(['src/**'], gulp.series('compile'));
    done();
});

gulp.task('default', gulp.parallel('watch-src'));