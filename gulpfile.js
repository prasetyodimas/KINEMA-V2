const gulp     	= require('gulp'),
	  sass    	  = require('gulp-sass'),
	  cleanCSS    = require('gulp-clean-css');
	  plumber  	  = require('gulp-plumber'),
	  uglify   	  = require('gulp-uglify'),
	  concat	    = require('gulp-concat'),
	  pipe		    = require('gulp-pipe'),
	  browserSync = require('browser-sync').create();

//vendor task copy third party libraries from /node_modules into /vendor
gulp.task('vendor',function(){
  console.log('function was working !');
  gulp.src(['./node_modules/bootstrap/dist/**/*', ]).pipe(gulp.dest('./vendor/bootstrap'));
  gulp.src(['./node_modules/jquery/dist/**/*', ]).pipe(gulp.dest('./vendor/jquery'));
  gulp.src(['./node_modules/animate.css/**/*', ]).pipe(gulp.dest('./vendor/animate'));
  gulp.src(['./node_modules/gsap/src/minified/**/*/',]).pipe(gulp.dest('./vendor/gsap'));
  gulp.src(['./node_modules/scrollmagic/scrollmagic/minified/**/*']).pipe(gulp.dest('./vendor/scrollmagic'));
	gulp.src(['./node_modules/nicescroll/dist/**/*/',]).pipe(gulp.dest('./vendor/nicescroll'));
  // gulp.src(['./node_modules/']).pipe(gulp.dest('./vendor/'));
});


//Function Scripts task compressed !
gulp.task('js:compress', function() {
	// Console.log('task runner working todo :) !!');
	function handleError(name){
		return function (error){
			console.error('Error from '+ name + 'in compress task !', err.toString());
		};
	}

	return gulp.src('frontend/js/*.js')
	.pipe(plumber())
	.pipe(uglify())
	.pipe(gulp.dest('frontend/dist/js'))
	.on('error',function(){
		console.error('Error in compress task', err.toString());
	});
});

//Function Compiled CSS !
gulp.task('css:compile', function(){
	console.log('run stlyes was here !!');
	return gulp.src('./scss/**/*.scss')
    .pipe(sass.sync({
      	outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(gulp.dest('./frontend/dist/css'));
});

// Minify CSS !
gulp.task('css:minify', ['css:compile'], function() {
  return gulp.src([
      './frontend/dist/css/*.css',
      '!./frontend/dist/css/*.min.css'
    ])
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});


//Function Watching JS
gulp.task('watch-js',function(){
	console.log('watching files JS !!');
	gulp.watch('dist/js');


});

//Function Watching JS
gulp.task('watch-style',function(){
	console.log('watching files Style !!');
});

gulp.task('browsersync',function(){
	console.log('its works !');
	browserSync.init({
		server:{
			baseDir: "./",
			directory:false
		}
	});
});

gulp.task('development',['browsersync'], function(){
	gulp.watch('./*.php',browserSync.reload);
  	gulp.watch('./main/*.js', ['js'], ['jshint']);
  	// gulp.watch('./main/*.js', ['js'], ['jshint']);
});
