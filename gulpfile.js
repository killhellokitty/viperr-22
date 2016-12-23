var gulp        = require("gulp");
var sass        = require("gulp-sass");
var rename      = require('gulp-rename');
var imagemin    = require('gulp-imagemin');
var cache       = require('gulp-cache');
var chroma      = require('chroma-js');
var chromatic   = require("chromatic-sass");
const osTmpdir  = require('os-tmpdir');

osTmpdir();
//=> '/var/folders/m3/5574nnhn0yj488ccryqr7tc80000gn/T'


gulp.task('sass', function () {
    return gulp.src(['./**/sass/*.scss'])
        .pipe(sass({
            outputStyle: 'expanded',
            precision: 5,
            require: 'sass-yiq',
            require: 'sass-planifolia',
            onError: function (err) {
                notify().write(err);
            }
        }))
        .pipe(rename(function (path) {
            path.dirname += "/../";
        }))
        .pipe(gulp.dest('./'))
});

gulp.task('images', function(){
    return gulp.src('./**/assets/*')
        .pipe(cache(imagemin({
        })))
        .pipe(gulp.dest('./**/assets/*'))
});

gulp.task('default', ['sass','build','images']);
