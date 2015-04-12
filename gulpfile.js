var gulp = require('gulp');
var scsslint = require('gulp-scss-lint');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var watch = require('gulp-watch');
var autoprefixer = require('gulp-autoprefixer');
var concatCss = require('gulp-concat-css');

var paths = {
  scss: 'public/scss/**/*.scss',
  assets: 'public/assets/**/*',
  vendor: 'public/scss/vendor/*.css'
};

gulp.task('default', ['sass'], function() {
  return gulp.watch([
      paths.scss,
      paths.assets,
      paths.vendor,
    ], ['default']);
});


// compiles scss then minifies and uglifies all css files
// including vendor files and scss files

  gulp.task('sass', ['minify-css']);

  gulp.task('compile-sass', function() {
    return gulp.src(paths.scss)
      .pipe(scsslint())
      .pipe(sass())
      .pipe(gulp.dest('./public/scss/'));
  });

  gulp.task('concat-css', ['compile-sass'], function () {
    return gulp.src(['./public/scss/*.css', paths.vendor])
      .pipe(concatCss('style.css'))
      .pipe(gulp.dest('./public/stylesheets'));
  });

  gulp.task('minify-css', ['concat-css'], function() {
    return gulp.src('./public/stylesheets/style.css')
      .pipe(minifyCSS())
      .pipe(gulp.dest('./public/stylesheets/'))
  });
