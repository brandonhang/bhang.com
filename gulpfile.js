var gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean-css'),
    remove = require('gulp-clean'),
    rename = require('gulp-rename'),
    watch = require('gulp-watch'),
    runSequence = require('run-sequence'),
    merge = require('merge-stream');

gulp.task('clean', function() {
    var cleanOldCss = gulp.src('./css/*.min.css', {read: false})
        .pipe(remove());
    var cleanOldJs = gulp.src('./js/*.min.js', {read: false})
        .pipe(remove());

    return merge(cleanOldCss, cleanOldJs);
});

gulp.task('sass', function() {
    return gulp.src('./css/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

gulp.task('minify', function() {
    var minifyCss = gulp.src('./css/*.css')
        .pipe(clean({debug: true}, function(details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
        .pipe(rename(function(path) {
            path.extname = '.min.css'
        }))
        .pipe(gulp.dest('./css/'));
    var minifyJs = gulp.src('./js/*.js')
        .pipe(uglify())
        .pipe(rename(function(path) {
            path.extname = '.min.js'
        }))
        .pipe(gulp.dest('./js/'));

    return merge(minifyCss, minifyJs);
});

gulp.task('default', function() {
    runSequence('clean', 'sass', 'minify', function(error) {
        if (error) {
            console.log(error.message);
            throw "Build error: please check the log for details";
        }
        else {
            console.log('Scripts and stylesheets minified successfully!');
        }
    });
});

gulp.task('watch', function() {
    gulp.watch(['./css/scss/*.scss', './js/*.js'], ['default']);
});

gulp.task('test', function() {
    console.log('She was more like a beauty queen from a movie scene');
});
