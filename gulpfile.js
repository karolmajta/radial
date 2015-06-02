var _ = http = require('http'),
        gulp = require('gulp'),
        source = require('vinyl-source-stream'),
        livereload = require('gulp-livereload'),
        browserify = require('browserify'),
        watchify = require('watchify')
        ecstatic = require('ecstatic');

gulp.task('assets', function () {
  return gulp.src('./src/assets/**/*')
    .pipe(gulp.dest('./dist/assets'))
    .pipe(livereload());
});

gulp.task('index', function () {
  return gulp.src('./src/html/index.html')
    .pipe(gulp.dest('./dist'))
    .pipe(livereload());
});

gulp.task('watch', function () {
  gulp.watch('./src/html/index.html', ['index']);
  gulp.watch('./src/assets/**/*', ['assets']);
});

gulp.task('browserify', function () {
  var bundler = browserify({
    entries: ['./src/js/main.js'],
    debug: true
  });
  return bundler.bundle()
    .pipe(source('./bundle.js'))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('watchify', function () {
  var watcher = watchify(browserify({
    entries: ['./src/js/main.js'],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  }));
  watcher.on('update', function () {
    watcher.bundle()
      .pipe(source('./bundle.js'))
      .pipe(gulp.dest('./dist/js'))
      .pipe(livereload());
  });
  watcher.bundle()
    .pipe(source('./bundle.js'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(livereload());
});

gulp.task('listen', function () {
  livereload.listen();
});

gulp.task('serve', function () {
  http.createServer(ecstatic({root: __dirname + '/dist'})).listen(8080);
})

gulp.task('build', ['browserify', 'assets', 'index']);
gulp.task('develop', ['assets', 'index', 'listen', 'watchify', 'watch', 'serve']);
