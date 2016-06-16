var gulp = require('gulp');

var livereload = require('gulp-livereload');


gulp.task('ejs', function() {
  // place code for your default task here
    gulp.src('views/*.ejs')
        .pipe(livereload());
});

gulp.task('default', function() {
      livereload.listen();
      gulp.watch('views/*.*', ['ejs']);
});