const gulp = require("gulp");
const sass = require("gulp-sass");
const terser = require("gulp-terser");
const deploy = require("gulp-gh-pages");
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

// push build to gh-pages
function ghDeploy() {
  return gulp.src("dist/**/**/*").pipe(deploy());
}

exports.ghDeploy = ghDeploy;

function watch() {
  gulp.watch(
    ["src/*.html", "src/assets/sass/*.scss", "src/assets/js/*.js"],
    { interval: 500 },
    parallel(copyHTML, style, minifyJS)
  );
}

exports.default = series(parallel(copyHTML, style, minifyJS), watch);
