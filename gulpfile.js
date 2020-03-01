const gulp = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const plumber = require('gulp-plumber');
const sourcemap = require('gulp-sourcemaps');
const less = require('gulp-less');
const server = require('browser-sync').create();
const del = require('del');
const LessAutoprefix = require('less-plugin-autoprefix');
const autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });

gulp.task('js', (done) => {
  gulp.src('./source/js/main.js')
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(gulp.dest('./public/js'));
    done();
});

gulp.task('css', (done) => {
  gulp.src('./source/css/less/style.less')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less({
      plugins: [autoprefix]
    }))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('./public/css'))
    .pipe(server.stream());
    done();
});

gulp.task('server', () => {
  server.init({
    server: 'public/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/css/less/**/*.less', gulp.series('css'));
  gulp.watch('source/js/**/*.js', gulp.series('js', 'refresh'));
});

gulp.task('refresh', (done) => {
  server.reload();
  done();
});

gulp.task('copy', () => {
  return gulp.src([
    'source/css/fonts/**/*.ttf',
    'source/css/assets/**',
    'source/index.html'
  ], {
    base: 'source'
  })
  .pipe(gulp.dest('./public/'));
});

gulp.task('clean', (done) => {
  del('public');
  done();
});

gulp.task('build', gulp.series('clean', 'copy', 'css', 'js'));
gulp.task('start', gulp.series('build', 'server'));
