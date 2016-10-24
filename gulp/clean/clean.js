'use strict';

/**
 * 清除文件
 *
 */

var gulp = require('gulp'),
    clean = require('gulp-clean');

gulp.task('clean:font', function() {		// font
    return gulp.src(['dist/font'], {read: false})
                .pipe(clean());
});
gulp.task('clean:img', function() {			// img
    return gulp.src(['dist/img'], {read: false})
                .pipe(clean());
});
gulp.task('clean:html', function() {		// html
    return gulp.src(['dist/view'], {read: false})
                .pipe(clean());
});
gulp.task('clean:css', function() {			// css
    return gulp.src(['dist/css'], {read: false})
                .pipe(clean());
});
gulp.task('clean:js', function() {			// js
    return gulp.src(['dist/js'], {read: false})
                .pipe(clean());
});