var gulp = require('gulp');
var zip = require('gulp-zip');
var gutil = require('gulp-util');

var pkg = require('./package.json');
var bow = require('./bower.json');

gulp.task('checkpkg', function () {
	var matches = {
		'name': pkg.name === bow.name,
		'version': pkg.version === bow.version,
		'description': pkg.description === bow.description,
		'homepage': pkg.homepage === bow.homepage,
		'license': pkg.license === bow.license,
		'author': pkg.author === bow.authors[0]
	};
	var fails = 0;
	for (var item in matches) {
		if (matches.hasOwnProperty(item) && matches[item] === false) {
			gutil.log(gutil.colors.red(item + ' was not the same in package.json and bower.json'));
			fails++;
		}
	}
	if (fails === 0) {
		gutil.log(gutil.colors.green('Package checks passed!'));
	}
});

gulp.task('dist', function () {
	return gulp.src('src/*')
		.pipe(zip(pkg.name + '_' + pkg.version + '.zip'))
		.pipe(gulp.dest('dist'));
});

gulp.task('default', ['checkpkg', 'dist']);
