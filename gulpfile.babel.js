'use strict';

import gulp from 'gulp';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import minify from 'gulp-clean-css';
import del from 'del';
import tinypng from 'gulp-tinypng';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';

gulp.task("concatScripts", () => {
  return gulp.src('sections/**/*.js')
      .pipe(concat("main.js"))
      .pipe(gulp.dest("src/js"));
});

gulp.task("minifyScripts", ["concatScripts"], () => {
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

gulp.task('compileSass', () => {
  return gulp.src("src/scss/main.scss")
      .pipe(sass())
      .pipe(gulp.dest('src/scss'));
});

gulp.task('minifyCss', () => {
  return gulp.src("src/scss/main.css")
      .pipe(minify())
      .pipe(rename('main.min.css'))
      .pipe(gulp.dest('assets/css'));
});

gulp.task('compressImages', () => {
    gulp.src('src/img/*')
        .pipe(tinypng('vHR3peFJDX89CSBttBzaN1ucq2fOP1_l'))
        .pipe(gulp.dest('assets/img'));
});

gulp.task('moveMarkup', () => {
  gulp.src('src/*.html')
      .pipe(gulp.dest('assets'));
})

gulp.task('watchFiles', () => {
  gulp.watch(['sections/**/*.scss', 'src/scss/**/*.scss'], ['compileSass']);
  gulp.watch('sections/**/*.js', ['concatScripts']);
});

gulp.task('clean', () => {
  del(['dist', 'assets/css/main.min.css', 'assets/js/main.min.js']);
});

gulp.task('build', ['minifyScripts', 'minifyCss', 'moveMarkup'], () => {
  return gulp.src(["assets/css/main.min.css", "assets/js/main.min.js", 'assets/*.html',
                   "assets/img/*"], { base: './' })
              .pipe(gulp.dest('dist'));
});

gulp.task('serve', ['watchFiles']);

gulp.task("default", ['clean'], () => {
  gulp.start('build');
});
