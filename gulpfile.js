var gulp = require('gulp'),
    rename = require("gulp-rename"),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass');


gulp.task('sass', function() {
    return gulp.src('./source/sass/*.scss')
        .pipe(sass({
            'outputStyle' : 'expanded'
        }))
        .pipe(gulp.dest('./assets/css/'))
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

gulp.task('compileJs', function() {
  return gulp.src(['./source/js/*.js'])
    .pipe(concat('luxloop.min.js'))
    .pipe(uglify({mangle: true}))
    .pipe(gulp.dest('./assets/js/'))
});

gulp.task('compileLibs', function() {
  return gulp.src(['./source/js/lib/*.js'])
    .pipe(concat('lib.min.js'))
    .pipe(uglify({mangle: true}))
    .pipe(gulp.dest('./assets/js/'))
});

gulp.task('js', ['compileJs','compileLibs']);

gulp.task('build', ['js','sass']);

gulp.task('watchcss', function() {
    gulp.watch('./source/sass/*.scss', ['sass']);
});

gulp.task('watchjs', function() {
    gulp.watch('./source/js/*.js', ['compileJs']);
});

gulp.task('watch', function() {
    gulp.watch('./source/sass/*.scss', ['sass']);
    gulp.watch('./source/js/*.js', ['compileJs']);
});

gulp.task('default', ['sass']);
