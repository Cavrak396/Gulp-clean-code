var gulp = require("gulp");
var scss = require("gulp-sass");

//Source
//Option
//Destionation

//Create dist --- Generate scss to css 
gulp.task("scss", () => {
  return gulp
    .src("src/scss/style.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"));
});
