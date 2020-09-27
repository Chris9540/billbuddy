'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var uglifycss = require('gulp-uglifycss');
sass.compiler = require('node-sass');


 
gulp.task('sass', function () {
  return gulp.src('./sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});
 

gulp.task('css', function () {
    gulp.src('./css/style.css')
      .pipe(uglifycss({"uglyComments": true}))
      .pipe(gulp.dest('./public/'));
});

