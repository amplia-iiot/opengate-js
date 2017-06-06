'use strict';

var flatten = require('gulp-flatten');
var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var mochaPhantomJS = require('gulp-mocha-phantomjs');
var cucumber = require('gulp-cucumber');
var minimist = require('minimist');

var esdoc = require("gulp-esdoc");
var clean = require('gulp-clean');
var babel = require('gulp-babel');
var browserify = require('gulp-browserify');
var sourcemaps = require('gulp-sourcemaps');

var rename = require("gulp-rename");

var entryClient = 'opengate-api-bower.js';
var entryServer = 'opengate-api-npm.js';
var src = [entryServer, 'src/**/*.js'];
var srcOption = { base: './' };
var dest = './dist';

var cucumberOptionsCatalog = {
    string: 'tags',
    default: { 'tags': '~@ignore' }
};

var argv = process.argv.slice(2);
argv.push("--tags");
argv.push("~@ignore");
var cucumberOptions = minimist(argv, cucumberOptionsCatalog);

gulp.task('clean', function() {
    return gulp.src(dest, { read: false })
        .pipe(clean({ force: true }));
});

gulp.task('clean-doc', function() {
    return gulp.src(['./documentation'], { read: false })
        .pipe(clean({ force: true }));
});

gulp.task('generate-doc', ['clean-doc'], function() {
    return gulp.src('.')
        .pipe(esdoc());
});

gulp.task('npm', ['clean'], function() {
    return gulp.src(src, srcOption)
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write('.', { includeContent: false, sourceRoot: '..' }))
        .pipe(gulp.dest(dest));
});

gulp.task('bower', ['clean'], function() {
    return gulp.src(entryClient, srcOption)
        .pipe(sourcemaps.init())
        .pipe(browserify({
            insertGlobals: true,
            debug: !gulp.env.production,
            transform: ['babelify']
        }))
        .pipe(ver())
        .pipe(sourcemaps.write('.', { includeContent: false, sourceRoot: '..' }))

        .pipe(gulp.dest(dest));
});

gulp.task('bower:min', ['clean'], function() {
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
        .pipe(sourcemaps.write('.', { includeContent: false, sourceRoot: '..' }))
        .pipe(gulp.dest(dest));
});


gulp.task('compile', ['clean', 'npm', 'bower', 'bower:min']);

gulp.task('build', ['compile', 'generate-doc']);

gulp.task('default', ['watch-src']);

gulp.task('cucumber', function() {
    var cucumberFinalOptions = {
        'steps': '*features/step_definitions/*.js',
        'support': '*features/support/*.js',
        'format': 'pretty',
        'tags': cucumberOptions.tags
    };
    return gulp.src('features/features/**/*.feature').pipe(cucumber(cucumberFinalOptions));
});


gulp.task('watch-src', function() {
    gulp.watch(['src/**'], ['compile']);
});


gulp.task('watch-test-client', function() {
    gulp.watch(['test/client/**'], ['test-client']);
});

gulp.task('test-client', function() {
    return gulp
        .src('test/client/**/fields.test.html')
        .pipe(mochaPhantomJS({
            reporter: 'spec',
            timeout: 25000,
            phantomjs: {
                useColors: true,
                settings: {
                    resourceTimeout: 30000,
                    localToRemoteUrlAccessEnabled: true
                }
            }
        }))
        .on('error', gutil.log);
});


/* ###############################################################################
                            Tasks to increase version
   ###############################################################################*/

// dependencies 
var ver = require('gulp-ver'),
    git = require('gulp-git'),
    bump = require('gulp-bump'),
    argv = require('yargs').argv,
    runSequence = require('run-sequence'),
    tag_version = require('gulp-tag-version');


/**
 * Bumping version number and tagging the repository with it.
 * Please read http://semver.org/
 *
 * You can use the commands
 *
 *     gulp patch     # makes v0.1.0 → v0.1.1
 *     gulp feature   # makes v0.1.1 → v0.2.0
 *     gulp release   # makes v0.2.1 → v1.0.0
 *
 * To bump the version numbers accordingly after you did a patch,
 * introduced a feature or made a backwards-incompatible release.
 */

//STEP 1 
gulp.task('create:release:branch', function(cb) {
    git.checkout(temporalBranchRelease(), { args: '-b' }, function(err) {
        cb(err);
    })
});

// STEP 2
gulp.task('build:all', function(cb) {
    runSequence('increase:version', 'build', cb);
})

gulp.task('increase:version', ['create:release:branch'], function() {
    return increase(versionType());
});

// STEP 2

// STEP 3 
gulp.task('commit:increase:version', ['build:all'], function() {
    return gulp.src(['dist', './bower.json', './package.json', './documentation'])
        .pipe(git.add())
        .pipe(git.commit('release ' + versionType() + ' version:' + versionNumber()))
});
// STEP 3 

// STEP 4
gulp.task('checkout:master:increase', ['commit:increase:version'], function(cb) {
    git.checkout(masterBranch(), function(err) {
        cb(err);
    })
});

gulp.task('merge:master:increase', ['checkout:master:increase'], function(cb) {
    git.merge(temporalBranchRelease(), function(err) {
        cb(err);
    });
})

gulp.task('prepare_tag:increase', ['merge:master:increase'], function() {
    return gulp.src(['./package.json'])
        .pipe(tag_version());
});

gulp.task('prepare:develop:increase', ['prepare_tag:increase'], function(cb) {
    git.checkout(developBranch(), function(err) {
        if (!err) {
            git.merge(masterBranch(), function(err) {
                cb(err);
            });
        } else {
            cb(err);

        }
    });
});
// STEP 4

gulp.task('push:increase', ['prepare:develop:increase', 'prepare_tag:increase'], function(cb) {
    git.push('origin', [masterBranch(), developBranch()], { args: " --follow-tags" }, function(err) {
        if (!err) {
            git.branch(temporalBranchRelease(), { args: "-D" }, function(err) {
                cb(err);
            });
        } else {
            cb(err);
        }
    });
});

function increase(importance) {
    // get all the files to bump version in 
    return gulp.src(['./package.json', './bower.json'])
        // bump the version number in those files 
        .pipe(bump({ type: importance }))
        // save it back to filesystem 
        .pipe(gulp.dest('./'))
}

function temporalBranchRelease() {
    return (argv['temporal-branch'] === undefined) ? 'release_branch' : argv['temporal-branch'];
}

function masterBranch() {
    return (argv['master-branch'] === undefined) ? 'master' : argv['master-branch'];
}

function developBranch() {
    return (argv['develop-branch'] === undefined) ? 'develop' : argv['develop-branch'];
}

function versionType() {
    if (isPatch()) return "patch";
    if (isMajor()) return "major";
    if (isMinor()) return "minor";
    throw new Error('Version increase type unknown. Only valid [minor,major,patch].');
}

function versionNumber() {
    var fs = require('fs')
    var json = JSON.parse(fs.readFileSync('package.json', 'utf8'))
    return json.version;
}

function isMinor() {
    return (argv.minor === undefined) ? false : true;
}

function isMajor() {
    return (argv.major === undefined) ? false : true;
}

function isPatch() {
    return (argv.patch === undefined) ? false : true;
}