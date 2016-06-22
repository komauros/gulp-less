//Basic Setup
var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var del = require('del');
var jquery = require('jquery');
//Styles Task
/**
*1. Preberi .css datoteke
*2. Precisti CSS
*3. Zdruzi .css datoteke v eno datoteko styles.css
*4. Zapisi styles.css v /dist mapo
*/


// Less Task
gulp.task('less', function() {
    return gulp.src('app/less/styles.less') //samo styles, ostale importamo
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(concat('all.css'))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('dist'));
});

//Images Task
gulp.task('images',function(){
    return gulp.src('app/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
});

//JQuery Task
gulp.task('jquery',function(){
    return gulp.src('node_modules/jquery/dist/jquery.min.js')
        .pipe(gulp.dest('dist'));
});

//Scripts Task
gulp.task('scripts', function() {
	return gulp.src('app/js/*.js')
		.pipe(sourcemaps.init())
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write('maps'))
		.pipe(gulp.dest('dist'));
});

// Clean Task
    gulp.task('clean', function(cb) {
	return del(['dist/*'], cb);
});


//Watch Task
/**
*Opravilo naj preverja spremembe v izvornih datotekah
*/
gulp.task('watch', function() {

    gulp.watch('app/css/*.less', gulp.series('less'));
  //  gulp.watch('app/js/*.js', gulp.series('scripts'));  //ko se zgodi sprememba .js zažene scripts task
 //   gulp.watch('app/img/*', gulp.series('images'));
});

//Default Task
//gulp.task('default',gulp.series(['clean','jquery','less','images','scripts','watch']));
gulp.task('default',gulp.series(['clean','less','watch']));