
var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  karma = require('karma').server,
  jasmine = require('gulp-jasmine');


// Run test once and exit
gulp.task('test-client', function (done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, function (exitStatus) {
        done();
    });
});
gulp.task('test', function () {
    return gulp.src('app/**/*.spec.js')
        .pipe(jasmine());
});


// Watch for file changes and re-run tests on each change
gulp.task('tdd', function (done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js'
    }, function (exitStatus) {
        done();
    });
});

gulp.task('start', function () {
  nodemon({
    script: 'server.js',
        ext: 'js html',
        env: { 'NODE_ENV': 'development' }
  });
});
