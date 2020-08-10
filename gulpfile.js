'use strict';
 
var gulp = require('gulp');
var	autoprefixer = require("gulp-autoprefixer");
var exec = require("gulp-exec");
var	browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var	cp = require("child_process");
 
gulp.task("css", function () {
  return gulp.src('./_assets/css/**/*.css')
    // .pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer())
    .pipe(gulp.dest('./docs/css'))
    .pipe(browserSync.stream({ match: '**/*.css'}) );
});

gulp.task("jekyll", function() {
	return cp.spawn("bundle", ["exec", "jekyll", "build"], { stdio: "inherit", shell: true });
});

gulp.task("watch", function() {

    browserSync.init({
        server: {
            baseDir: "./docs/"
        }
    });

	gulp.watch('_assets/css/**/*.css', gulp.series('css') );

	gulp.watch( [
		"./*.html",
		"./_includes/*.html",
		"./_layouts/*.html",
	]).on('change', gulp.series('jekyll', 'css') );
    
    gulp.watch( 'docs/**/*.html' ).on('change', browserSync.reload);
    gulp.watch( 'docs/**/*.js' ).on('change', browserSync.reload);

});
 
gulp.task("default", gulp.series('jekyll', 'css', 'watch') );
