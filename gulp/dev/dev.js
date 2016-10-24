'use strict';

/**
 * 开发环境
 *
 */

var gulp = require('gulp'),
    concat = require('gulp-concat'),        // 合并
    rename = require('gulp-rename'),        // 重命名
    jshint = require('gulp-jshint'),        // js 代码检测（install jshint）
    connect = require('gulp-connect'),      // 启动web服务
    includer = require('gulp-content-includer');    // html 模版替换


// 复制 html
gulp.task('html:dev', ['clean:html'], function() {
    return gulp.src('view/**/*.html')
                .pipe(includer({
                        includerReg: /<!\-\-include\s+"([^'']+)"\-\->/g,
                        deepConcat: true    // 递归
                    }))
                .pipe(gulp.dest('dist/view'))
                .pipe(connect.reload());
});


// 图片和字体文件
gulp.task('img:dev', ['clean:img'], function(){
    return gulp.src('src/img/**/*')
        .pipe(gulp.dest('dist/img'));
});
gulp.task('font:dev', ['clean:font'], function(){
    return gulp.src('src/font/**/*')
        .pipe(gulp.dest('dist/font'));
});


// 压缩 css
gulp.task('css:dev', ['clean:css'], function() {
    return gulp.src('src/css/*.css')
                .pipe(rename({suffix: '.min'}))
                .pipe(gulp.dest('dist/css'));
});


// 合并，检测，压缩 js
gulp.task('js:common:dev', function() {
    return gulp.src('src/js/common/**/*.js')
                .pipe(concat('common.js'))
                .pipe(jshint())
                .pipe(rename({suffix: '.min'}))
                .pipe(gulp.dest('dist/js'));
});
gulp.task('js:page:dev', function() {
    return gulp.src('src/js/page/**/*.js')
                .pipe(jshint())
                .pipe(gulp.dest('dist/js'));
});
gulp.task('js:dev', ['clean:js'], function() {
    gulp.start(['js:common:dev', 'js:page:dev']);
});


// 启动web server
gulp.task('webserver', function() {
    connect.server({
        port: 80,
        host: 'dull',
        livereload: true
    });
});


// gulp 执行的默认命令（压缩要在检查js文件之后执行）
gulp.task('default', ['js:dev', 'css:dev', 'html:dev', 'img:dev', 'font:dev'], function() {
    gulp.start('webserver');
    // 监听文件变化
    gulp.watch('src/js/**/*.js', ['js:dev']);
    gulp.watch('src/css/**/*.css', ['css:dev']);
    gulp.watch('view/**/*.html', ['html:dev']);
    gulp.watch('src/img/**/*', ['img:dev']);
    gulp.watch('src/font/**/*', ['font:dev']);
});