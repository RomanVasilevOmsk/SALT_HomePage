var gulp = require('gulp');
var browserSync = require('browser-sync');
var stylus = require('gulp-stylus');
//var base64 = require('gulp-base64-inline');
var reload      = browserSync.reload;
var tinypng = require('gulp-tinypng');
var autoprefixer = require('gulp-autoprefixer');
var fileinclude = require('gulp-file-include');
var concat = require('gulp-concat');
var uglifycss = require('gulp-uglifycss');
var mmq = require('gulp-merge-media-queries');


gulp.task('autoprefixertask2', function () {
    return gulp.src('dist/css/app.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('tinypng', function () {
    gulp.src('src/images/**/*.*')
        .pipe(tinypng('sHYF22n0Q3Cq55ie_Gl6ofCc1HsYcKoV'))
        .pipe(gulp.dest('src/images2'));
});

var paths = {
    src: {

        html:'src/index.html',
        style:'src/stylus/app.styl',
        script:'src/js/app.js',
        contentImages: 'src/images/**/*.*',
        fonts: 'src/fonts/*.*'
    },
    dist: {
        html:'dist/',
        css:'dist/css/',
        script:'dist/js/',
        contentImages: 'dist/images/',
        fonts: 'dist/fonts/'
    },
    watch: {
        html:'src/**/*.html',
        style:'src/stylus/**/*.styl',
        styledist:'dist/css/app.css',
        styleVendor:'src/stylus/vendor/*.styl',
        script:'src/js/app.js',
        scriptsVendor:'src/js/vendor/*.js',
        contentImages: 'src/images/**/*.*',
        fonts: 'src/fonts/*.*'
    }
};


//html
gulp.task('html', function(){
  gulp
      .src(paths.src.html)
      .pipe(fileinclude({
          prefix: '@@',
          basepath: '@file'
      }))
      .pipe(gulp.dest(paths.dist.html))
    .pipe(reload({stream: true}));
});

// stylus
gulp.task('style', function(){
  return gulp
      .src(paths.src.style)
      .pipe(stylus())
      .pipe(uglifycss({
          "maxLineLen": 80,
          "uglyComments": true
      }))
      .pipe(gulp.dest(paths.dist.css))
        .pipe(reload({stream:true}));
});


// css
gulp.task('style:vendor', function(){
    return gulp
        .src([
            'src/stylus/vendor/normalize.styl',
            'node_modules/swiper/dist/css/swiper.min.css'
        ])
        .pipe(stylus())
        .pipe(uglifycss({
            "maxLineLen": 80,
            "uglyComments": true
        }))
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest(paths.dist.css))
        .pipe(reload({stream:true}));
});

// JavaScript
gulp.task('scripts', function(){
  return gulp
      .src(paths.src.script)
      .pipe(gulp.dest(paths.dist.script))
    .pipe(reload({stream:true}));
});
gulp.task('scripts:vendor', function(){
    return gulp
    .src([
        'src/js/vendor/*.js',
        'node_modules/swiper/dist/js/swiper.min.js'
        ])

        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest(paths.dist.script))
        .pipe(reload({stream:true}));
});


//livereload
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: "dist/"
    },
    port: 8080,
    open: true,
    notify: false
  });
});
gulp.task('images', function() {
    gulp.src(paths.src.contentImages)
        .pipe(gulp.dest(paths.dist.contentImages))
});

gulp.task('fonts', function() {
    gulp.src(paths.src.fonts)
        .pipe(gulp.dest(paths.dist.fonts))
});
gulp.task('build', [
    'html',
    'style',
    'style:vendor',
    'images',
    'scripts',
    'scripts:vendor',
    'fonts',
    'autoprefixertask2',
    'mmq'
]);

gulp.task('mmq', function () {
    gulp.src('dist/css/app.css')
        .pipe(mmq({
            log: true
        }))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('watcher',function(){
    gulp.watch(paths.watch.style, function(event, cb) {
        gulp.start('style');
    });
    gulp.task('fonts', function() {
        gulp.src(paths.src.fonts)
            .pipe(gulp.dest(paths.dist.fonts))
    });
    gulp.watch(paths.watch.styleVendor, function(event, cb) {
        gulp.start('style:vendor');
    });
    gulp.watch(paths.watch.html, function(event, cb) {
        gulp.start('html');
    });
    gulp.watch(paths.watch. script, function(event, cb) {
        gulp.start('scripts');
    });
    gulp.watch(paths.watch.contentImages, function(event, cb) {
        gulp.start('images');
    });
    gulp.watch(paths.watch.scriptsVendor, function(event, cb) {
        gulp.start('scripts:vendor');
    });
    gulp.watch('dist/css/app.css', function(event, cb) {
        gulp.start('mmq');
    });
});
gulp.task('default', ['watcher','browserSync']);
