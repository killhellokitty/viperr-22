var gulp        = require("gulp");
var sass        = require("gulp-sass");
var rename      = require('gulp-rename');
var imagemin    = require('gulp-imagemin');
var cache       = require('gulp-cache');
var chroma      = require('chroma-js');
var chromatic   = require("chromatic-sass");
var changed     = require("gulp-changed");
var remember    = require("gulp-remember");



gulp.task('sass', function () {
    return gulp.src(['./**/sass/*.scss'])
        .pipe(changed('sass'))
        .pipe(sass({
            outputStyle: 'expanded',
            precision: 5,
            require: 'sass-yiq',
            require: 'sass-planifolia',
            onError: function (err) {
                notify().write(err);
            }
        }))
        .pipe(remember('sass'))
        .pipe(rename(function (path) {
            path.dirname += "/../";
        }))
        .pipe(gulp.dest('./'))
});

gulp.task('images', function(){
    return gulp.src('./**/assets/*')
        .pipe(cache(imagemin({
        })))
        .pipe(remember('images'))
        .pipe(gulp.dest('./**/assets/*'))
});

gulp.task('cache:clear', function (callback) {
    return cache.clearAll(callback)
})

gulp.task('default', ['sass','build','images','cache:clear']);
