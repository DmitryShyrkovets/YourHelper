
"use strict";

var gulp = require("gulp"),
    sass = require("gulp-sass"),
    del = require("del"); 

var paths = {
    webroot: "./wwwroot/",
    nodeRoot: './node_modules/',
    targetPath: './wwwroot/lib/'
};

gulp.task("scss", function () {
    return gulp.src('./wwwroot/scss/index.scss')
        .pipe(sass())
        .pipe(gulp.dest(paths.webroot + '/css'));
});

 gulp.task('clean_css', function () {
     return del([paths.targetPath + '**/*']);
 });

gulp.task('clean_libs', function () {
    return del([paths.webroot + '/css/**/*']);
});

 gulp.task('libs', function () {
     gulp.src(paths.nodeRoot + "bootstrap/**/*").pipe(gulp.dest(paths.targetPath + "/bootstrap"));
     gulp.src(paths.nodeRoot + "jquery/**/*").pipe(gulp.dest(paths.targetPath + "/jquery"));
     gulp.src(paths.nodeRoot + "bootstrap-datepicker/**/*").pipe(gulp.dest(paths.targetPath + "/bootstrap-datepicker"));
 });

