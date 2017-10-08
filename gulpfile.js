var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    runSequence = require('run-sequence'),
    merge = require('merge-stream');

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
    runSequence('minify', function(error) {
        if (error) {
            console.log(error.message);
            throw "Build error: please check the log for details";
        }
        else {
            console.log('Scripts and stylesheets minified successfully!');
        }
    });
});
