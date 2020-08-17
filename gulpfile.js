const gulp = require("gulp");
const sass = require("gulp-sass");
const terser = require("gulp-terser");
const imagemin = require("gulp-imagemin");
const { src, parallel, series } = require("gulp");
const rename = require("gulp-rename");
const browserSync = require("browser-sync").create();

// compiled html
function copyHTML() {
  return src("src/*.html").pipe(gulp.dest("dist"));
}

// Compile scss into css
function style() {
  return gulp
    .src("src/assets/sass/*.scss")
    .pipe(
      sass({
        errLogToConsole: true,
        outputStyle: "compressed",
      })
    )
    .on("error", console.error.bind(console))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("dist/assets/css"))
    .pipe(browserSync.stream());
}

// compiled and minified js
function minifyJS() {
  return gulp
    .src("src/assets/js/*.js")
    .pipe(terser())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("dist/assets/js"));
}

// minified image
function compressedImg() {
  return gulp
    .src("src/assets/img/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/assets/img"));
}

function watch() {
  gulp.watch(
    [
      "src/*.html",
      "src/assets/sass/*.scss",
      "src/assets/js/*.js",
      "src/assets/img/*",
    ],
    { interval: 100 },
    parallel(copyHTML, style, minifyJS, compressedImg)
  );
}

exports.default = series(
  parallel(copyHTML, style, minifyJS, compressedImg),
  watch
);
