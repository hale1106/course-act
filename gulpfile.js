var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var cache = require('gulp-cache');
var exec = require('gulp-exec');
var process = require('child_process');
var _process = require('process');
var os = require('os');

var abcPkb = require('./abc.json');

var demoExec = 'cd '+abcPkb.source+';fis3 server clean ; fis3 release demo; fis3 server start -p '+abcPkb.port+'; fis3 release demo -w';
var debugExec = 'cd '+abcPkb.source+';fis3 server clean ; fis3 release debug; fis3 server start -p '+abcPkb.port+'; fis3 release debug -w';
var type = os.type();

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
	var _exec = type === 'Windows_NT' ? demoExec.replace(/;/g,'&') : demoExec;
	var ls = process.exec(_exec,function(err,s,t){
		cb();
	});
	ls.stdout.on('data', function (res) {
		_process.stdout.write(res);
	});
	ls.stderr.on('data', function (data) {
		_process.stdout.write('stderr: ' + data);
	});
})


gulp.task('debugrun',function(cb){
	var _exec = type === 'Windows_NT' ? debugExec.replace(/;/g,'&') : debugExec;
	var ls = process.exec(_exec,function(err,s,t){
		cb();
	});
	ls.stdout.on('data', function (res) {
		_process.stdout.write(res);
	});
	ls.stderr.on('data', function (data) {
		_process.stdout.write('stderr: ' + data);
	});
})

gulp.task('output',function(cb){
	var options = {
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
		.pipe(exec('cd src;rm -rf ../build ;fis3 release -d ../build', options))
		.pipe(exec.reporter(reportOptions))
		.on('finish',cb);
});


gulp.task('build',gulp.series('output','imagemin'));



