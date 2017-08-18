/* @flow */
import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import runSequence from 'run-sequence'

const $ = gulpLoadPlugins()

gulp.task('chromeManifest', ['js'], () => {
  return gulp
    .src('app/manifest.json')
    .pipe(
      $.chromeManifest({
        buildnumber: true,
        background: {
          target: 'scripts/background.js',
          exclude: ['scripts/chromereload.js']
        }
      })
    )
    .pipe(gulp.dest('dist'))
})

gulp.task('js', () => {
  return gulp
    .src(['app/scripts/options.js', 'app/scripts/popup.js'])
    .pipe(gulp.dest('dist/scripts'))
})

gulp.task('size', () => {
  return gulp.src('dist/**/*').pipe($.size({ title: 'build', gzip: true }))
})

gulp.task('package', function () {
  const manifest = require('./app/manifest.json')
  const app = require('./package.json')

  if (app.version !== manifest.version) {
    throw new Error('Please update verions')
  }

  return gulp
    .src('dist/**')
    .pipe($.zip(app.name + '-' + manifest.version + '.zip'))
    .pipe(gulp.dest('package'))
})

gulp.task('build', cb => {
  runSequence('chromeManifest', 'size', cb)
})

gulp.task('default', cb => {
  runSequence('build', cb)
})
