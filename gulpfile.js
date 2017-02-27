var gulp = require('gulp'),
    rename = require("gulp-rename"),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    hb = require('gulp-hb');

gulp.task('html', function () {
  return gulp
    .src('./source/{,!(_*)/}*.html')
    .pipe(hb({
      partials: './source/_partials/*.hbs',
      helpers: './source/_helpers/*.js',
      data: './source/_data/*.{js,json}'
    }))
    .pipe(gulp.dest('./site'));
});


gulp.task('sass', function() {
    return gulp.src('./source/_sass/*.scss')
        .pipe(sass({
            'outputStyle' : 'expanded'
        }))
        .pipe(gulp.dest('./site/assets/css/'))
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
        .pipe(gulp.dest('./site/assets/css/'));
});

gulp.task('compileJs', function() {
  return gulp.src(['./source/_js/*.js'])
    .pipe(concat('luxloop.min.js'))
    .pipe(uglify({mangle: true}))
    .pipe(gulp.dest('./site/assets/js/'))
});

gulp.task('compileLibs', function() {
  return gulp.src(['./source/_js/lib/*.js'])
    .pipe(concat('lib.min.js'))
    .pipe(uglify({mangle: true}))
    .pipe(gulp.dest('./site/assets/js/'))
});

gulp.task('js', ['compileJs','compileLibs']);

gulp.task('build', ['site','js','sass']);

gulp.task('watchhtml', function() {
    gulp.watch(['./source/{,!(_*)/}*.html','./source/_partials/*.hbs'], ['html']);
});

gulp.task('watchcss', function() {
    gulp.watch('./source/_sass/*.scss', ['sass']);
});

gulp.task('watchjs', function() {
    gulp.watch('./source/_js/*.js', ['compileJs']);
});

gulp.task('watch', function() {
    gulp.watch('./source/_sass/*.scss', ['sass']);
    gulp.watch('./source/_js/*.js', ['compileJs']);
});

gulp.task('default', ['sass']);
