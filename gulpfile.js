const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

// Пути к файлам
const paths = {
    styles: {
        src: 'src/scss/**/*.scss', // Исходные SCSS-файлы
        dest: 'dist/css/' // Готовые CSS-файлы
    },
    scripts: {
        src: 'src/js/**/*.js', // Исходные JS-файлы
        dest: 'dist/js/' // Готовые JS-файлы
    },
    images: {
        src: 'src/img/**/*', // Исходные изображения
        dest: 'dist/img/' // Оптимизированные изображения
    }
};

// Задача для компиляции SCSS
function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream());
}

// Задача для минификации JS
function scripts() {
    return gulp.src(paths.scripts.src)
        .pipe(uglify())
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(browserSync.stream());
}

// Задача для оптимизации изображений
function images() {
    return gulp.src(paths.images.src)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.images.dest));
}

// Задача для запуска локального сервера
function serve() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch('./*.html').on('change', browserSync.reload);
}

// Экспорт задач
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.serve = gulp.series(styles, scripts, serve);
exports.default = gulp.series(styles, scripts, images);