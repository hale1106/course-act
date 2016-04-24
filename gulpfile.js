var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var cache = require('gulp-cache');
var exec = require('gulp-exec');
var process = require('child_process');
var _process = require('process');

var abcPkb = require('./abc.json');

gulp.task('imagemin',function(cb){
	gulp.src('./build/images/**')
		.pipe(cache(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest('./build/images'))
		.on('finish',cb);
});

gulp.task('demorun',function(cb){
	/*var options = {
		continueOnError: true, // default = false, true means don't emit error event
		pipeStdout: true, // default = false, true means stdout is written to file.contents
		customTemplatingThing: "test" // content passed to gutil.template()
	};
	var reportOptions = {
		err: true, // default = true, false means don't write err
		stderr: true, // default = true, false means don't write stderr
		stdout: true // default = true, false means don't write stdout
	};
	gulp.src('./abc.json',{read:false})
		.pipe(exec('cd src;fis3 server clean ; fis3 release demo; fis3 server start -p '+abcPkb.port+'; fis3 release demo -w', options))
		.pipe(exec.reporter(reportOptions))
		.on('finish',cb);*/
	var ls = process.exec('cd src;fis3 server clean ; fis3 release demo; fis3 server start -p '+abcPkb.port+'; fis3 release demo -w',function(err,s,t){
		cb();
	});
	ls.stdout.on('data', function (res) {
		_process.stdout.write(res);
	});
	ls.stderr.on('data', function (data) {
		_process.stdout.write('stderr: ' + data);
	});
})

