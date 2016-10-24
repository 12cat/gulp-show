'use strict';

/**
 * 最终构建打包
 *
 */

var gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin'),      // html 压缩
    minifycss = require('gulp-minify-css'), // css 压缩
    uglify = require('gulp-uglify'),        // js 压缩
    concat = require('gulp-concat'),        // 合并
    rename = require('gulp-rename'),        // 重命名
    jshint = require('gulp-jshint'),        // js 代码检测（install jshint）
    base64 = require('gulp-base64'),        // 图片base64
    config = require('../config'),
    rev = require('gulp-rev'),
    revCollector  = require('gulp-rev-collector'),
    includer = require('gulp-content-includer');    // html 模版替换


// 复制 html
gulp.task('html', ['clean:html', 'base64', 'js'], function() {
    return gulp.src(['src/rev/**/*.json', 'view/**/*.html', '!view/common/*'])
                .pipe(revCollector())
                .pipe(includer({
                        includerReg: /<!\-\-include\s+"([^'']+)"\-\->/g,
                        deepConcat: true    // 递归
                    }))
                .pipe(htmlmin({collapseWhitespace: true}))
                .pipe(rename({suffix: '.min'}))
                .pipe(gulp.dest('dist/view'));
});


// 图片和字体文件
gulp.task('img', ['clean:img'], function(){
    return gulp.src('src/img/**/*')
        .pipe(rev())
        .pipe(gulp.dest('dist/img'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('src/rev/img'));
});
gulp.task('font', ['clean:font'], function(){
    return gulp.src('src/font/**/*')
        .pipe(rev())
        .pipe(gulp.dest('dist/font'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('src/rev/font'));
});


// 压缩 css
gulp.task('css', ['clean:css', 'img', 'font'], function() {
    return gulp.src(['src/css/*.css'])
                .pipe(rename({suffix: '.min'}))
                .pipe(minifycss())
                .pipe(gulp.dest('dist/css'));
});
// css 图片base64
gulp.task('base64', ['css'], function() {
    return gulp.src(['src/rev/**/*.json', 'dist/css/*.css'])
                .pipe(base64(config.base64))
                .pipe(revCollector())
                .pipe(rev())
                .pipe(gulp.dest('dist/css'))
                .pipe(rev.manifest())
                .pipe(gulp.dest('src/rev/css'));
});


// 合并，检测，压缩 js
gulp.task('js:common', function() {
    return gulp.src('src/js/common/**/*.js')
                .pipe(concat('common.js'))
                .pipe(jshint())
                .pipe(rename({suffix: '.min'}))
                .pipe(rev())
                .pipe(uglify(config.uglify))
                .pipe(gulp.dest('dist/js'))
                .pipe(rev.manifest())
                .pipe(gulp.dest('src/rev/js/common'));
});
gulp.task('js:page', function() {
    return gulp.src('src/js/page/**/*.js')
                .pipe(jshint())
                .pipe(rev())
                .pipe(gulp.dest('dist/js'))
                .pipe(rev.manifest())
                .pipe(gulp.dest('src/rev/js/page'));
});
gulp.task('js', ['clean:js'], function() {
    gulp.start(['js:common', 'js:page']);
});


// 最终项目构建 build
gulp.task('build', function() {
    gulp.start('html');
});