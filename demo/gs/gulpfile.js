var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    rename = require("gulp-rename"),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

gulp.task('css', function() {
    return gulp.src('./css/main.css')
        .pipe(sass({
            'outputStyle' : 'expanded'
        }))
        .pipe(gulp.dest('./css/'))
        .pipe(cleanCSS({
          compatibility: 'ie8',
          aggressiveMerging: false,
          mediaMerging: false,
          rebase: false,
          roundingPrecision: -1
        }))
        .pipe(rename(function (path) {
          path.extname = ".min.css"
        }))
        .pipe(gulp.dest('./css/'));
});

gulp.task('compressjs', function() {
  return gulp.src(['./js/main.js'])
    .pipe(uglify({
      mangle: true,
      preserveComments: 'license'
    }))
    .pipe(rename(function (path) {
      path.extname = ".min.js"
    }))
    .pipe(gulp.dest('./js/'))
});

// gulp.task('concatjs', function() {
//   return gulp.src(['./public/js/util.min.js','./public/js/vendor/stats.min.js','./public/js/vendor/detectmobile.min.js','./public/js/vendor/shuffle.min.js'])
//     .pipe(concat('support.js'))
//     .pipe(gulp.dest('./public/js/'))
// });


gulp.task('watch', function() {
    gulp.watch('./sass/*.scss', ['sass']);
});

gulp.task('default', ['sass']);
