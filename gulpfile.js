// TODO: should this reference separate gulpfiles within each sub-app's directory?

var projectName = 'jackieandlevi',

    scriptsSrcPath = 'src/apps/scripts/**/*.js',
    stylesGlobSrcPath = 'src/apps/styles/**/*.scss',
    stylesMainSrcPath = 'src/apps/styles/main.scss',
    imagesSrcPath = 'src/apps/images/**/*',
    serverTestsSrcPath = 'src/server/tests/**/*_test.js',
    frontEndTestsSrcPath = 'src/apps/*/public/**/*_test.js',

    distPath = 'distPath',
    scriptsDistPath = distPath + '/scripts',
    stylesDistPath = distPath + '/styles',
    imagesDistPath = distPath + '/images',

    sourcemapPath = '../src/scss',

    serverMainPath = 'src/server/main.js',

    gulp = require('gulp'),
    plugins = require('gulp-load-plugins')();

gulp.task('scripts', function () {
  return gulp.src(scriptsSrcPath)
      .pipe(plugins.plumber())
      .pipe(plugins.concat(projectName + '.js'))
      .pipe(gulp.dest(scriptsDistPath))
      .pipe(plugins.filesize())
      .pipe(plugins.rename({suffix: '.min'}))
      .pipe(plugins.uglify())
      .pipe(gulp.dest(scriptsDistPath))
      .pipe(plugins.filesize())
      .pipe(plugins.notify({message: 'scripts task complete'}))
      .pipe(plugins.livereload());
});

gulp.task('styles', function () {
  return gulp.src(stylesMainSrcPath)
      .pipe(plugins.plumber())
      // TODO: go back to rubySass if it isn't broken anymore...
      //.pipe(plugins.rubySass({style: 'expanded', sourcemap: true, sourcemapPath: sourcemapPath}))
      .pipe(plugins.sass({sourceComments: 'map'}))
      .pipe(plugins.autoprefixer('last 2 version'))
      .pipe(gulp.dest(stylesDistPath))
      .pipe(plugins.rename({suffix: '.min'}))
      .pipe(plugins.minifyCss())
      .pipe(gulp.dest(stylesDistPath))
      .pipe(plugins.notify({message: 'styles task complete'}))
      .pipe(plugins.livereload());
});

gulp.task('images', function () {
  return gulp.src(imagesSrcPath)
      .pipe(plugins.plumber())
      .pipe(plugins.cache(plugins.imagemin({optimizationLevel: 3, progressive: true, interlaced: true})))
      .pipe(gulp.dest(imagesDistPath))
      .pipe(plugins.notify({message: 'images task complete'}))
      .pipe(plugins.livereload());
});

gulp.task('tests-once', ['server-tests-once', 'front-end-tests-once']);

gulp.task('server-tests-once', function () {
  return gulp.src(serverTestsSrcPath, {read: false})
      .pipe(plugins.mocha({reporter: 'dot', ui: 'tdd'}));
});

gulp.task('front-end-tests-once', function () {
  return gulp.src(frontEndTestsSrcPath)
      .pipe(plugins.karma({configFile: 'karma.conf.js', action: 'run'}));
});

gulp.task('front-end-tests-tdd', function () {
  return gulp.src(frontEndTestsSrcPath)
      .pipe(plugins.karma({configFile: 'karma.conf.js', action: 'watch'}));
});

gulp.task('bump', function () {
  return gulp.src(['./bower.json', './package.json'])
      .pipe(bump({type: 'patch'})) // 'major'|'minor'|'patch'|'prerelease'
      .pipe(gulp.dest('./'));
});

gulp.task('clean', function () {
  return gulp.src(distPath, {read: false})
      .pipe(plugins.clean());
});

gulp.task('default', ['clean'], function () {
  gulp.start('server', 'scripts', 'styles', 'tests-once', 'watch');//, 'images');// TODO: add image compression for future, image-dependent projects
});

gulp.task('watch', ['front-end-tests-tdd'], function () {
  gulp.watch(stylesGlobSrcPath, ['styles']);

  gulp.watch(scriptsSrcPath, ['scripts']);

//  gulp.watch(imagesSrcPath, ['images']);// TODO: add image compression for future, image-dependent projects

//  gulp.watch(serverTestsSrcPath, ['server-tests-once']);
});

gulp.task('server', function () {
  plugins.nodemon({script: 'src/main.js'});
});