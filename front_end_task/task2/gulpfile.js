const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require('browser-sync').create();
//const minify = require('gulp-minifier');
//var minify = require("gulp-csso");
//var rename = require("gulp-rename");

gulp.task("sass", function () {
    gulp.src("sass/style.scss")      //звідки ми все починаємо
        .pipe(sass())
        .pipe(gulp.dest("css"))     // в яку папку зберегти результат
        // .pipe(minify())
        // .pipe(rename("style.min.css"))
        // .pipe(gulp.dest("build/css"))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('watch', ['browserSync'], function () {
    gulp.watch('sass/**/*.scss', ['sass']);
    gulp.watch("*.html").on("change", browserSync.reload);
    // Other watchers
});

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    })
});

/*
gulp.task('example', function() {
    return gulp.src('example/src/!**!/!*').pipe(minify({
        minify: true,
        minifyHTML: {
            collapseWhitespace: true,
            conservativeCollapse: true,
        },
        minifyJS: {
            sourceMap: true
        },
        minifyCSS: true,
        getKeptComment: function (content, filePath) {
            let m = content.match(/\/\*![\s\S]*?\*\//img);
            return m && m.join('\n') + '\n' || '';
        }
    })).pipe(gulp.dest('example/dest'));
});*/
