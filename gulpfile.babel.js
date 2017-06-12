/* @flow */
import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import del from 'del'
import runSequence from 'run-sequence'

const $ = gulpLoadPlugins()

gulp.task('images', () => {
  return gulp
    .src('app/images/**/*')
    .pipe(
      $.if(
        $.if.isFile,
        $.cache(
          $.imagemin({
            progressive: true,
            interlaced: true,
            // don't remove IDs from SVGs, they are often used
            // as hooks for embedding and styling
            svgoPlugins: [{ cleanupIDs: false }]
          })
        ).on('error', function (err) {
          console.log(err) // eslint-disable-line no-console
          this.end()
        })
      )
    )
    .pipe(gulp.dest('dist/images'))
})

gulp.task('chromeManifest', () => {
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

gulp.task('clean', del.bind(null, ['.tmp', 'dist']))

gulp.task('size', () => {
  return gulp.src('dist/**/*').pipe($.size({ title: 'build', gzip: true }))
})

gulp.task('package', function () {
  const manifest = require('./dist/manifest.json')
  const app = require('./package.json')

  if (app.version !== manifest.version) {
    throw new Error('Pleas update verions')
  }

  return gulp
    .src('dist/**')
    .pipe($.zip(app.name + '-' + manifest.version + '.zip'))
    .pipe(gulp.dest('package'))
})

gulp.task('build', cb => {
  runSequence(
    'chromeManifest',
    'images',
    'size',
    cb
  )
})

gulp.task('default', ['clean'], cb => {
  runSequence('build', cb)
})
