var gulp = require('gulp'),
    rename = require("gulp-rename"),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    insert = require('gulp-insert'),
    data = require('gulp-data'),
    hb = require('gulp-hb'),
    matter = require('gray-matter'),
    gutil = require('gulp-util'),
    notify = require("gulp-notify"),
    runSequence = require('run-sequence');

var sourceDir = "source/"
var destDir = "docs/"

////////////////////
// Tasks

gulp.task('html', function () {
  return gulp
    .src(sourceDir + '{,!(_*)/}*.html')
    .pipe(hb({
      partials: sourceDir + '_templates/partials/*.hbs',
      helpers: sourceDir + '_templates/helpers/*.js',
      data: sourceDir + '_templates/data/*.{js,json}'
    }))
    .on('error', onError)
    .pipe(gulp.dest(destDir));
});

gulp.task('buildProjData', function() {
  return gulp
    .src(sourceDir + 'projects/*.{md,markdown}')
    .pipe(data(function(file){
      var m = matter(String(file.contents))
      var project = m.data;
      project.content = m.content;
      file.contents = new Buffer(JSON.stringify(m.data));
      return file;
    }))
    .on('error', onError)
    .pipe(concat('projects.json', {newLine: ','}))
    .pipe(insert.wrap('{"projects": [', ']}'))
    .pipe(gulp.dest(sourceDir + '_templates/data'));
});

gulp.task('buildProjPages', function() {
  var projects = require('./' + sourceDir + '_templates/data/projects.json').projects;
  for (var i = projects.length - 1; i >= 0; i--) {
    //console.log(projects[i].name);
    var fileName = projects[i].slug + '.html'
      gulp.src(sourceDir + '_templates/project.html')
        .pipe(hb({
          partials: sourceDir + '_templates/partials/*.hbs',
          helpers: sourceDir + '_templates/helpers/*.js',
          data: projects[i]
      }))
      .on('error', onError)
      .pipe(rename(fileName))
      .pipe(gulp.dest(destDir + '/projects' ));
  }
});


gulp.task('sass', function() {
    return gulp.src(sourceDir + '_sass/*.scss')
        .pipe(sass({
            'outputStyle' : 'expanded',
            'includePaths': [
              require("bourbon-neat").includePaths,
              require("bourbon").includePaths,
              "./node_modules/normalize-scss/sass"
            ]
        }))
        .on('error', onError)
        .pipe(postcss([ autoprefixer() ]))
        .on('error', onError)
        .pipe(gulp.dest(destDir + 'assets/css/'))
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
        .pipe(gulp.dest(destDir + 'assets/css/'));
});

gulp.task('moveCss', function() {
  return gulp.src([sourceDir + '_css/*.css'])
    .pipe(gulp.dest(destDir + 'assets/css/'))
});

gulp.task('compileJs', function() {
  return gulp.src([sourceDir + '_js/*.js'])
    .pipe(concat('luxloop.min.js'))
    .pipe(uglify({mangle: true}))
    .on('error', onError)
    .pipe(gulp.dest(destDir + 'assets/js/'))
});

gulp.task('compileTools', function() {
  return gulp.src([sourceDir + '_js/lib/*.js'])
    .pipe(concat('tools.min.js'))
    .pipe(uglify({mangle: true}))
    .on('error', onError)
    .pipe(gulp.dest(destDir + 'assets/js/'))
});

gulp.task('moveJs', function() {
  return gulp.src([sourceDir + '_js/vendor/*.js'])
    .pipe(gulp.dest(destDir + 'assets/js/vendor'))
});

////////////////////
// Error Handlers

function onError(error) {
  // Adapted from: https://github.com/mikaelbr/gulp-notify/issues/81

  var lineNumber = (error.lineNumber||error.line) ? 'line ' + (error.lineNumber||error.line) : '';
  var fileName = (error.fileName||error.file) ? (error.fileName||error.file.split('/').pop()) : '';

  notify({
    title: 'Task Failed [' + error.plugin + ']',
    message: ((fileName !== '') ? fileName + ': ' : '') + ((lineNumber !== '') ? lineNumber + ' -- ' : '') + 'See console.',
    sound: 'Sosumi' // See: https://github.com/mikaelbr/node-notifier#all-notification-options-with-their-defaults
  }).write(error);

  // Alt sounds:
  // 'Bottle', 'Basso'

  // Inspect the error object
  //console.log(error);

  // Easy error reporting
  //console.log(error.toString());

  // Pretty error reporting
  var report = '';
  var chalk = gutil.colors.white.bgRed;

  report += chalk('TASK:') + ' [' + error.plugin + ']\n';
  if (lineNumber !== '') { report += chalk('LINE:') + ' ' + lineNumber.split(' ').pop() + '\n'; }
  if (fileName !== '')   { report += chalk('FILE:') + ' ' + fileName + '\n'; }
  report += chalk('PROB:') + ' ' + (error.formatted||error.messageOriginal||error.message||error.messageFormatted) + '\n';

  console.error(report);

  // Prevent the 'watch' task from stopping
  this.emit('end');
}

////////////////////
// Shortcuts

gulp.task('style', ['sass','moveCss']);
gulp.task('js', ['compileJs','compileTools','moveJs']);

//gulp.task('build', ['buildProjData','html','js','style']);

gulp.task('build', function() {
  runSequence(
    'buildProjData',
    ['html','js','style','buildProjPages']
  );
});

gulp.task('buildTemplated', function() {
  runSequence(
    'buildProjData',
    ['html','buildProjPages']
  );
});

gulp.task('watchdata', function() {
  gulp.watch([sourceDir + 'projects/*.{md,markdown}'],['buildTemplated'])
})

gulp.task('watchhtml', function() {
  gulp.watch([sourceDir + '{,!(_*)/}*.html',sourceDir + '_templates/partials/*.hbs'], ['html']);
});

gulp.task('watchcss', function() {
  gulp.watch([sourceDir + '_sass/*.scss',sourceDir + '_sass/partials/*.scss'], ['sass']);
});

gulp.task('watchjs', function() {
  gulp.watch(sourceDir + '_js/*.js', ['compileJs']);
});

gulp.task('watch', ['watchdata','watchhtml','watchcss','watchjs']);

gulp.task('default', ['build']);
