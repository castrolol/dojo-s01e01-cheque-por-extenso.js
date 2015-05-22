var gulp = require('gulp');
var mocha = require('gulp-mocha');
var plumber = require("gulp-plumber");
 
 gulp.task('tests', function () {
    return gulp.src('tests/specs.js', {read: false}) 
        .pipe(plumber())
        .pipe(mocha());
});

gulp.task('watch', function(){
   
   gulp.watch('./**/*.*', ["tests"]);
    
});

gulp.task('default', ['tests', 'watch']);