var gulp = require("gulp");
var svgstore = require("gulp-svgstore");
var svgmin = require("gulp-svgmin");
var path = require("path");
var inject = require("gulp-inject");
var browserSync = require("browser-sync").create();
var reload = browserSync.reload;

gulp.task("svg", function() {
  var svgs = gulp
    .src("./assets/svgs/*.svg")
    .pipe(svgstore({ inlineSvg: true }));

  function fileContents(filePath, file) {
    return file.contents.toString();
  }

  return gulp
    .src("./index.html")
    .pipe(inject(svgs, { transform: fileContents }))
    .pipe(gulp.dest("./"));
});

gulp.task("insert", function() {
  var target = gulp.src("./index.html");
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src(["./assets/main.js", "./assets/main.css"], {
    read: false
  });

  return target.pipe(inject(sources)).pipe(gulp.dest("./"));
});

gulp.task('browser-sync', function() {
  browserSync.init({
    server:{
      baseDir:"./"
    }
  });

  gulp.watch(["*.html", "assets/*.*"]).on("change", reload);
});