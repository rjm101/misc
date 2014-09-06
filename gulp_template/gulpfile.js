// Modules
var gulp     = require('gulp'),
	header   = require('gulp-header'),       // Add header comments
	sequence = require('run-sequence'),      // Ensure clean runs before other tasks
	clean    = require('gulp-clean'),        // Clean dist directory 
	uglify   = require('gulp-uglifyjs'),     // Uglify and concat JS
	sass     = require('gulp-ruby-sass'),    // Compiled SASS
	prefix   = require('gulp-autoprefixer'), // Prefex CSS
	connect  = require('gulp-connect');      // localhost

// JS ordering
var pkg  = require('./package.json'),
	opts;


/**
 * Messaging functions
 */
// Error handling
var log = {
	emitError: function(error){

		console.error.bind(error);
		this.emit('end');
	},
	emitMessage: function(env){
		
		opts = env;
		console.log('\n\n Running '+env+' task...\n');
	}
};


/**
 * Gulp sub tasks
 */
// Clean
gulp.task('clean', function(){

	return gulp.src('dist', {read: false})
		.pipe(clean({force: true}));
});

// Uglify js
gulp.task('uglifyLibs', function(){

	return gulp.src(pkg.libFiles)

		.pipe(uglify('libs.min.js'))
		.on('error', log.emitError)
		.pipe(gulp.dest('dist/js'));
});

gulp.task('uglifyApp', function(){

	var jsOpts = {};

	if(opts === 'dev'){
		jsOpts = {
			mangle: false,
			output: {
				beautify: true
			}
		};
	}

	return gulp.src(pkg.appFiles)
		.pipe(uglify('app.scripts.js', jsOpts))
		.on('error', log.emitError)
		.pipe(header('// <%= name %> - v<%= version %> - '+new Date()+'\n\n', pkg))
		.pipe(gulp.dest('dist/js'));
});

// Compile SASS
gulp.task('sass', function(){

	var sassOpts = {
		sourcemap: false,
		style: 'compressed',
		noCache: true
	};

	if(opts === 'dev'){
		sassOpts = {
			style:'expanded', 
			lineNumbers:true,
			noCache: true
		};
	}

	return gulp.src('app/sass/compiled.scss')

		.pipe(sass(sassOpts))
		.on('error', log.emitError)
		.pipe(prefix())
		.pipe(gulp.dest('dist/css'));
});

// Copy files
gulp.task('copy', function(){

	gulp.src('app/*.html').pipe(gulp.dest('dist'));
	gulp.src('app/favicons/**/*').pipe(gulp.dest('dist/favicons'));
	gulp.src('app/fonts/**/*').pipe(gulp.dest('dist/fonts'));
	gulp.src('app/img/**/*').pipe(gulp.dest('dist/img'));
	gulp.src('app/libs/modernizr-2.7.1.min.js').pipe(gulp.dest('dist/js'));
});

// Watch file changes
gulp.task('watch', function(){

	gulp.watch('app/libs/**/*.js', ['uglifyLibs']);
	gulp.watch('app/js/**/*.js', ['uglifyApp']);
	gulp.watch('app/sass/**/*.scss', ['sass']);
});

// Localhost
gulp.task('connect', function(){
	connect.server({
		root: 'dist',
		host: '*',
		port: 9000,
		livereload: false
	});
});


/**
 * Gulp operations
 */
// main dev task
gulp.task('serve', ['dev_build', 'connect', 'watch']);

gulp.task('dev_build', function(){
	log.emitMessage('dev');
	sequence('clean', ['uglifyApp', 'uglifyLibs', 'sass', 'copy']);
});

// Deploy task
gulp.task('deploy', function(){
	log.emitMessage('deploy');
	sequence('clean', ['uglifyApp', 'uglifyLibs', 'sass', 'copy']);
});