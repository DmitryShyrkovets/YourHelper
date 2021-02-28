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
