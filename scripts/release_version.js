'use strict';

var gulp = require('gulp'),
    ver = require('gulp-ver'),
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
    git.checkout(temporalBranchRelease(), { args: '-b' }, function (err) {
        cb(err);
    });
});

// STEP 2
gulp.task('build:all', function (cb) {
    runSequence('increase:version', 'build', cb);
});

gulp.task('increase:version', ['create:release:branch'], function() {
    return increase(versionType());
});

// STEP 2

// STEP 3 
gulp.task('commit:increase:version', ['build:all'], function() {
    return gulp.src(['dist', './bower.json', './package.json', './documentation', './src/util/searchingFields/source-precompiled/Fields.js'])
        .pipe(git.add())
        .pipe(git.commit('release ' + versionType() + ' version:' + versionNumber()));
});
// STEP 3 

// STEP 4
gulp.task('checkout:master:increase', ['commit:increase:version'], function(cb) {
    git.checkout(masterBranch(), function (err) {
        cb(err);
    });
});

gulp.task('merge:master:increase', ['checkout:master:increase'], function (cb) {
    git.merge(temporalBranchRelease(), function (err) {
        cb(err);
    });
});

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
        .pipe(gulp.dest('./'));
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
    var fs = require('fs');
    var json = JSON.parse(fs.readFileSync('package.json', 'utf8'));
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