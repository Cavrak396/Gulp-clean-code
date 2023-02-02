var gulp = require("gulp");
var scss = require("gulp-sass");
var scssLint = require("gulp-sass-lint");
var consolidate = require("gulp-consolidate");
var iconfont = require("gulp-iconfont");

//Rules
//[1] Source
//[2] Option
//[3] Destionation

//Create dist --- Generate scss to css
gulp.task("scss", () => {
  return gulp
    .src("src/scss/style.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"));
});

//Watch task --- Watch scss
gulp.task("default", ["scss", "scss-lint"], () => {
  gulp.watch("src/**/*.scss", ["scss", "scss-lint"]);
});

//Scss lint
gulp.task("scss-lint", () => {
  return gulp
    .src("src/scss/*.scss")
    .pipe(
      scssLint({
        configFile: ".sass-lint.yml",
      })
    )
    .pipe(scssLint.format())
    .pipe(scssLint.failOnError());
});

//IconFont

//Location --- what we generate
gulp.task("iconfont", function () {
  return (
    gulp
      .src("src/svg/*.svg")
      .pipe(
        iconfont({
          fontName: "iconfont",
          formats: ["ttf", "eot", "woff", "woff2"],
          appendCodepoints: true,
          appendUnicode: false,
          normalize: true,
          fontHeight: 1000,
          centerHorizontally: true,
        })
      )

      //Where we generate it
      .on("glyphs", function (glyphs, options) {
        gulp
          .src("src/iconfont-template/iconfont.scss")
          .pipe(
            consolidate("underscore", {
              glyphs: glyphs,
              fontName: options.fontName,
              fontDate: new Date().getTime(),
            })
          )
          .pipe(gulp.dest("src/scss/base/icon-font"));
      })
      //Final destination
      .pipe(gulp.dest("dist/fonts"))
  );
});
