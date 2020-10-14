'use strict'

//define variables which include npm packages - load the plugins

var projectURL = 'https://the-builders-journey.local/';
var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("autoprefixer");
var postcss = require("gulp-postcss");
var sourcemaps = require("gulp-sourcemaps");
var notify = require("gulp-notify");
var uglify = require('gulp-uglify');
var imagemin = require("gulp-imagemin");
var concat = require("gulp-concat");
var cssnano = require("gulp-cssnano");
var rename = require("gulp-rename");


//var copyfonts = require('gulp-font');
//const webpack = require('webpack')
//const webpackConfig = require('./webpack.config.js')

//declare/define custom configuration object
var paths = {

    styles: {
        src: "src/css/",
        dest: "css/"
    },
    stylesMinified: {
        src: "src/css/",
        dest: "css/vendor/"
    },
    scripts: {
        src: [
            "src/js/",
        ],
        dest: "js/"
    },
    scriptsMinified: {
        src: [
            "src/js/",
        ],
        dest: "js/vendor/"
    },
    fonts: {
        src: [
            "src/fonts/",
        ],
        dest: "fonts/"
    },
    images: {
        src: [
            "src/images/",
        ],
        dest: "assets/"
    }
};

// create functions to return gulp
function styles() {
    return gulp
        .src([paths.styles.src + "tbj-styles.css"])
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on("error", notify.onError(function(e){
            return "error: " + e.message;
        }))
        .pipe(postcss([autoprefixer()]))
        .pipe(sourcemaps.write())
        .pipe(concat('main.css'))
        .pipe(gulp.dest(paths.styles.dest))
};

function stylesMin() {
    return gulp
        .src([
            'node_modules/bootstrap/dist/css/bootstrap.css',
            'node_modules/swiper/swiper-bundle.css',
            paths.styles.src + 'magnific-popup.css',
        ])
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .on("error", notify.onError(function(e){
            return "error: " + e.message;
        }))
        .pipe(postcss([autoprefixer()]))
        .pipe(cssnano())
        .pipe(sourcemaps.write())
        .pipe(concat('vendor.css'))
        .pipe(rename("vendor.min.css"))
        .pipe(gulp.dest(paths.stylesMinified.dest))
};

function scripts() {
    return gulp
        //.src([paths.scripts.src + "custom.js", paths.scripts.src + "vendor/*.js"])
        .src(
            [paths.scripts.src + "custom.js"],
            //[paths.scripts.src + "loadmore.js"]
            )
        .pipe(sourcemaps.init())
        .on("error", notify.onError(function(e){
            return "error: " + e.message;
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.scripts.dest))
}

function scriptsMin() {
    return gulp
        .src([
            paths.scripts.src + "vendor/*.js",
            'node_modules/swiper/swiper-bundle.js'
        ])
            //paths.scripts.src + "custom.js",])
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .on("error", notify.onError(function(e){
            return "error: " + e.message;
        }))
        .pipe(sourcemaps.write())
        .pipe(concat("vendor.js"))
        .pipe(rename("vendor.min.js"))
        .pipe(gulp.dest(paths.scriptsMinified.dest))
}

function fonts() {
    return gulp
        .src(['node_modules/@fortawesome/fontawesome-free/webfonts/*.*', paths.fonts.src + "*" ])
        .pipe(gulp.dest('fonts/'))

}

// function fonts() {
//     return gulp
//         .src(paths.fonts.src + "*.{ttf,woff,eot,svg}")
//         .pipe(copyfonts())
//         .on("error", notify.onError(function(e){
//             return "error: " + e.message;
//         }))
//         .pipe(gulp.dest(paths.fonts.dest))
// }

//Images
function images() {
    return gulp
        .src(paths.images.src + "*.*")
        .pipe(imagemin())
        .on("error", notify.onError(function(e){
            return "error: " + e.message;
        }))
        .pipe(gulp.dest(paths.images.dest))
}

//create commands that can be run in terminal
exports.styles = styles;
exports.stylesMin = stylesMin;
exports.scripts = scripts;
exports.scriptsMin = scriptsMin;
exports.fonts = fonts;
exports.images = images;

//var buildDev = gulp.parallel(styles);
//var buildDev = gulp.parallel(scripts);
//var buildDev = gulp.parallel(styles, stylesMin);
//var buildDev = gulp.parallel(styles, stylesMin, fonts);
//var buildDev = gulp.parallel(styles, stylesMin, fonts, scripts);
//var buildDev = gulp.parallel(styles, stylesMin, fonts, scripts, images);
var buildDev = gulp.parallel(styles, stylesMin, scripts, scriptsMin, fonts, images);
//var buildDev = gulp.parallel(styles, stylesMin, scripts, scriptsMin);


gulp.task("buildDev", buildDev);
//gulp.task("buildProd", buildProd);
//gulp.task("watch", watch);
gulp.task("default", buildDev);