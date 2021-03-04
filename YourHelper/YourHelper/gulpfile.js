 //<binding Clean='clean' />
"use strict";

var gulp = require("gulp"),
    sass = require("gulp-sass"); // добавляем модуль sass

var paths = {
    webroot: "./wwwroot/"
};
// регистрируем задачу для конвертации файла scss в css
gulp.task("account", function () {
    return gulp.src('./wwwroot/scss/account.scss')
        .pipe(sass())
        .pipe(gulp.dest(paths.webroot + '/css'));
});

gulp.task("menu", function () {
    return gulp.src('./wwwroot/scss/menu.scss')
        .pipe(sass())
        .pipe(gulp.dest(paths.webroot + '/css'));
});

gulp.task("profile_menu", function () {
    return gulp.src('./wwwroot/scss/profile_menu.scss')
        .pipe(sass())
        .pipe(gulp.dest(paths.webroot + '/css'));
});

gulp.task("settings", function () {
    return gulp.src('./wwwroot/scss/settings.scss')
        .pipe(sass())
        .pipe(gulp.dest(paths.webroot + '/css'));
});

gulp.task("notification", function () {
    return gulp.src('./wwwroot/scss/notification.scss')
        .pipe(sass())
        .pipe(gulp.dest(paths.webroot + '/css'));
});