var gulp = require('gulp');
var scsslint = require('gulp-scss-lint');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var watch = require('gulp-watch');
var autoprefixer = require('gulp-autoprefixer');
var concatCss = require('gulp-concat-css');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var concat = require('gulp-concat');
var ejsmin = require('gulp-ejsmin');
var uglify = require('gulp-uglifyjs');
var browserSync = require('browser-sync').create();

var mainCssName = 'style.css';
var mainJsName = 'build.js';

var allFiles = {
  css: 'public/scss/*.css',
  scss: 'public/scss/**/*.scss',
  assets: 'public/assets/**/*.*',
  templates: 'templates/**/*.ejs',
  vendorScss: 'public/scss/vendor/*.css',
  js: 'public/js/**/*.js'
};

var paths = {
  scss: './public/scss/',
  css: './public/dist/',
  dist: './public/dist/',
  assets: './public/assets/'
};

var files = {
  js: {
    all:
      [
        './bower_components/jquery/dist/jquery.min.js',
        './bower_components/wow/dist/wow.min.js',
        './public/js/touchWipe.js',
        './public/js/touch.js',
        './public/js/inits.js',
        './public/js/functions.js',
        './public/js/scripts.js',
        './public/js/parallax.js'
      ],
    main: './public/dist/' + mainJsName
  },
  css: './public/dist/' + mainCssName
}

gulp.task('default', ['serve']);

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'uglify-js', 'min-ejs', 'img-min'], function() {

    browserSync.init({
      proxy: "http://localhost:3000/"
    });

    gulp.watch(allFiles.scss, ['sass']);
    gulp.watch(allFiles.assets, ['img-min']);
    gulp.watch(allFiles.js, ['uglify-js']);
    gulp.watch(allFiles.templates, ['min-ejs']);
});

// compiles scss then minifies and uglifies all css files
// including vendor files and scss files

gulp.task('sass', ['minify-css']);

// compiles scss files into css
gulp.task('compile-sass', function() {
  return gulp.src(allFiles.scss)
    .pipe(scsslint())
    .pipe(sass())
    .pipe(gulp.dest(paths.scss))
    .pipe(browserSync.stream());
});

// concatenates all css files
gulp.task('concat-css', ['compile-sass'], function () {
  return gulp.src([allFiles.css, allFiles.vendorScss])
    .pipe(concatCss(mainCssName))
    .pipe(gulp.dest(paths.css));
});

// auto prefixes css properties
gulp.task('auto-prefix', ['concat-css'], function () {
  return gulp.src(files.css)
      .pipe(autoprefixer({
          browsers: ['last 10 versions'],
          cascade: true
      }))
      .pipe(gulp.dest(paths.css));
});

// minifies all css
gulp.task('minify-css', ['auto-prefix'], function() {
  return gulp.src(files.css)
    .pipe(minifyCSS())
    .pipe(gulp.dest(paths.css));
});

// concatenates all scripts
gulp.task('concat-scripts', function() {
  return gulp.src(files.js.all)
    .pipe(concat(mainJsName))
    .pipe(gulp.dest(paths.dist))
    .pipe(browserSync.stream());
});
  
// uglifies js
gulp.task('uglify-js', ['concat-scripts'], function() {
  return gulp.src(files.js.main)
    .pipe(uglify())
    .pipe(gulp.dest(paths.dist));
});

// minifies all images
gulp.task('img-min', function () {
  return gulp.src(allFiles.assets)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(paths.assets))
    .pipe(browserSync.stream());
});

// minifies ejs
gulp.task('min-ejs', function () {
  return gulp.src(allFiles.templates)
    .pipe(ejsmin({removeComment: true}))
    .pipe(gulp.dest("./views"))
    .pipe(browserSync.stream());
});