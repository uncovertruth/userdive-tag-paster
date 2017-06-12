/* @flow */
import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import del from 'del'
import runSequence from 'run-sequence'
import { stream as wiredep } from 'wiredep'

const $ = gulpLoadPlugins()

gulp.task('extras', () => {
  return gulp
    .src(
    [
      'app/*.*',
      'app/_locales/**',
      '!app/scripts.babel',
      '!app/*.json',
      '!app/*.html'
    ],
    {
      base: 'app',
      dot: true
    }
    )
    .pipe(gulp.dest('dist'))
})

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

gulp.task('html', () => {
  return gulp
    .src('app/*.html')
    .pipe($.sourcemaps.init())
    .pipe($.useref())
    .pipe($.debug())
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.cssnano()))
    .pipe($.if('*.html', $.htmlmin({ collapseWhitespace: true })))
    .pipe(gulp.dest('dist'))
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
    .pipe($.debug())
    .pipe($.if('*.css', $.cssnano()))
    .pipe($.if('*.js', $.sourcemaps.init()))
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.js', $.sourcemaps.write('.')))
    .pipe(gulp.dest('dist'))
})

gulp.task('babel', () => {
  return gulp
    .src(['app/scripts.babel/*.js'])
    .pipe($.babel())
    .pipe(gulp.dest('app/scripts'))
})

gulp.task('clean', del.bind(null, ['.tmp', 'dist']))

gulp.task('watch', ['babel', 'html'], () => {
  $.livereload.listen()

  gulp
    .watch([
      'app/*.html',
      'app/scripts/**/*.js',
      'app/images/**/*',
      'app/styles/**/*',
      'app/_locales/**/*.json'
    ])
    .on('change', $.livereload.reload)

  gulp.watch('app/scripts.babel/**/*.js', ['build'])
  gulp.watch('bower.json', ['wiredep'])
})

gulp.task('size', () => {
  return gulp.src('dist/**/*').pipe($.size({ title: 'build', gzip: true }))
})

gulp.task('wiredep', () => {
  gulp
    .src('app/*.html')
    .pipe(
      wiredep({
        ignorePath: /^(\.\.\/)*\.\./
      })
    )
    .pipe(gulp.dest('app/'))
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
    'babel',
    'chromeManifest',
    ['extras', 'html', 'images'],
    'size',
    cb
  )
})

gulp.task('default', ['clean'], cb => {
  runSequence('build', cb)
})
