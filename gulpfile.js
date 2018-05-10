'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
      sass = require('gulp-sass'),
    minify = require('gulp-clean-css'),
       del = require('del'),
   tinypng = require('gulp-tinypng'),
     babel = require('gulp-babel'),
sourcemaps = require('gulp-sourcemaps');

gulp.task("concatScripts", function() {
  return gulp.src('sections/**/*.js')
      .pipe(concat("main.js"))
      .pipe(gulp.dest("src/js"));
});

gulp.task("minifyScripts", ["concatScripts"], function() {
  return gulp.src("src/js/main.js")
      .pipe(sourcemaps.init())
      .pipe(babel())
      .on('error', function(e) {
        console.log('>>> ERROR', e);
        // emit here
        this.emit('end');
      })
      .pipe(uglify())
      .pipe(rename('main.min.js'))
      .pipe(gulp.dest("assets/js"));
});

gulp.task('compileSass', function() {
  return gulp.src("src/scss/main.scss")
      .pipe(sass())
      .pipe(gulp.dest('src/scss'));
});

gulp.task('minifyCss', function() {
  return gulp.src("src/scss/main.css")
      .pipe(minify())
      .pipe(rename('main.min.css'))
      .pipe(gulp.dest('assets/css'));
});

gulp.task('compressImages', function() {
    gulp.src('src/img/*')
        .pipe(tinypng('vHR3peFJDX89CSBttBzaN1ucq2fOP1_l'))
        .pipe(gulp.dest('assets/img'));
});

gulp.task('moveMarkup', function() {
  gulp.src('src/*.html')
      .pipe(gulp.dest('assets'));
})

gulp.task('watchFiles', function() {
  gulp.watch(['sections/**/*.scss', 'src/scss/**/*.scss'], ['compileSass']);
  gulp.watch('sections/**/*.js', ['concatScripts']);
});

gulp.task('clean', function() {
  del(['dist', 'assets/css/main.min.css', 'assets/js/main.min.js']);
});

gulp.task('build', ['minifyScripts', 'minifyCss', 'moveMarkup'], function() {
  return gulp.src(["assets/css/main.min.css", "assets/js/main.min.js", 'assets/*.html',
                   "assets/img/*"], { base: './' })
              .pipe(gulp.dest('dist'));
});

gulp.task('serve', ['watchFiles']);

gulp.task("default", ['clean'], function() {
  gulp.start('build');
});
