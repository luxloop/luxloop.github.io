var gulp = require('gulp'),
    rename = require("gulp-rename"),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    hb = require('gulp-hb');

gulp.task('html', function () {
  return gulp
    .src('./source/{,!(_*)/}*.html')
    .pipe(hb({
      partials: './source/_partials/*.hbs',
      helpers: './source/_helpers/*.js',
      data: './source/_data/*.{js,json}'
    }))
    .pipe(gulp.dest('./docs'));
});


gulp.task('sass', function() {
    return gulp.src('./source/_sass/*.scss')
        .pipe(sass({
            'outputStyle' : 'expanded'
        }))
        .pipe(gulp.dest('./docs/assets/css/'))
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
        .pipe(gulp.dest('./docs/assets/css/'));
});

gulp.task('moveCss', function() {
  return gulp.src(['./source/_css/*.css'])
    .pipe(gulp.dest('./docs/assets/css/'))
});

gulp.task('compileJs', function() {
  return gulp.src(['./source/_js/*.js'])
    .pipe(concat('luxloop.min.js'))
    .pipe(uglify({mangle: true}))
    .pipe(gulp.dest('./docs/assets/js/'))
});

gulp.task('compileTools', function() {
  return gulp.src(['./source/_js/lib/*.js'])
    .pipe(concat('tools.min.js'))
    .pipe(uglify({mangle: true}))
    .pipe(gulp.dest('./docs/assets/js/'))
});

gulp.task('moveJs', function() {
  return gulp.src(['./source/_js/vendor/*.js'])
    .pipe(gulp.dest('./docs/assets/js/vendor'))
});

gulp.task('style', ['sass','moveCss']);
gulp.task('js', ['compileJs','compileTools','moveJs']);

gulp.task('build', ['html','js','style']);

gulp.task('watchhtml', function() {
    gulp.watch(['./source/{,!(_*)/}*.html','./source/_partials/*.hbs'], ['html']);
});

gulp.task('watchcss', function() {
    gulp.watch(['./source/_sass/*.scss','./source/_sass/partials/*.scss'], ['sass']);
});

gulp.task('watchjs', function() {
    gulp.watch('./source/_js/*.js', ['compileJs']);
});

gulp.task('watch', ['watchhtml','watchcss','watchjs']);

gulp.task('default', ['build']);
