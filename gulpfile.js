 "use strict";

 var gulp        = require('gulp'),
     browserSync = require('browser-sync').create(),
     plugins = require('gulp-load-plugins')(),//заменяет декларирование переменных , но для каких-то плагинов глючит
     autoprefixer = require('gulp-autoprefixer'),
     plumber = require('gulp-plumber'),
     jade = require('gulp-jade'),
     sassGlob = require('gulp-sass-glob'),
     rimraf = require('rimraf'),
     spritesmith = require('gulp.spritesmith'),
     cleanCSS = require('gulp-clean-css'),
     replace = require('gulp-replace-task');



 var paths = {
     source: {/*пути с исходниками*/
         jade: './source/jade/index.jade',
         sass: './source/sass/index.scss',
         js: './source/js/*.js',
         spriteimages: './source/spriteimages/**/*.*',
         fonts: './source/fonts/**/*.*',
         sprite: './source/sass/common',
         images: './source/images/**/*.*'

     },

     watch: { /*пути для отслеживания изменений*/
         jade: './source/jade/**/*.jade',
         sass: 'source/sass/**/*.scss',
         js: 'source/js/**/*.js',
         html: 'app/*.html',
         css: './app/css/*.css'
     },
     app: { /*папка с готовым проектом для просмотра*/
         jade: './app',
         css: './app/css',
         html: './app',
         js: './app/js',
         fonts: './app/fonts',
         images: './app/images'
     },
     size: {
         app: './app'
     },
     clean: {
        app: './app'
     },
     sprite: {
         sourceimages: './source/spriteimages/**/*.png',
         destimages: './source/images',
         sass: './source/sass/common'
     }
 };

  var production = true,
      prodversion = '1.0.0';

 //очистка и заполнение папки app c дистрибутивом
 gulp.task('app', ['clean'],function(){ //очистка потом копирование в app
     gulp.start('dist');
 });


//компиляция кода в папку app - не за пусткает browsersync -
// запускать переж началом работы, если нет скомпилированных файлов
 gulp.task('compile',['jade','sass','js']);

 //сервер и слежение -
gulp.task('default',['server']);



//генерация спрайтов - отдельно
 /* Генерации спрайтов.  */
 gulp.task('sprite', function() {
     console.log(paths.source.spriteimages,paths.source.images, paths.source.sprite );
     var spriteData =
         gulp.src(paths.sprite.sourceimages)
             .pipe(spritesmith({
                 imgName: '../images/spritesmith.png', /* Указываем имя готового спрайта */
                 cssName: 'spritesmith.scss', /* Указываем имя файла SASS */
                 padding: 40
             }));
     spriteData.img.pipe(gulp.dest(paths.sprite.destimages)); /* Указываем пути, куда будет выгружатся картинка */
     spriteData.css.pipe(gulp.dest(paths.sprite.sass)); /* Указываем пути, куда будет выгружатся SASS */
 });



//компиляция

 gulp.task('jade', function() {
     var YOUR_LOCALS = {},
         patterns = [];;
     patterns.push({match: '%=suffix=%', replace: production ? '.min' : '' });
     patterns.push({match: '%=version=%', replace: production ? '.' + prodversion : '' });

     gulp.src(paths.source.jade)
         .pipe(plumber())
         .pipe(jade({
             locals: YOUR_LOCALS,
             pretty : '\t',
         }))
         .pipe(replace({ patterns: patterns, usePrefix: false }))
         .pipe(gulp.dest(paths.app.jade))
 });

 gulp.task('sass', function() {
     gulp.src(paths.source.sass)
         .pipe(plugins.if(!production,plugins.sourcemap.init()))
         .pipe(sassGlob())
         .pipe(plugins.sass().on('error', plugins.sass.logError))
         .pipe(plumber())
         .pipe(autoprefixer({
             browsers: ['last 50 versions'],
             cascade: false
         }))
         .pipe(plugins.if(!production,plugins.sourcemap.write()))
         .pipe(plugins.if(production,cleanCSS({compatibility: 'ie9'})))
         .pipe(plugins.if(production,plugins.rename("index.min."+prodversion+".css")))
         .pipe(gulp.dest(paths.app.css))
 });

 gulp.task('js',function(){
     gulp.src(paths.source.js)
         .pipe(plugins.if(!production,plugins.sourcemap.init()))
         .pipe(plugins.concat('index.js'))
         .pipe(plugins.if(!production,plugins.sourcemap.write()))
         .pipe(plugins.if(production,plugins.uglify()))
         .pipe(plugins.if(production,plugins.rename("index.min."+prodversion+".js")))
         .pipe(gulp.dest(paths.app.js))
 });

 // запуск browsersync  и дальнейшее слежение
 gulp.task('server', function() {
       browserSync.init({
         server: "./app"
     });

     gulp.watch(paths.watch.sass, ['sass']);
     gulp.watch(paths.watch.jade, ['jade']);
     gulp.watch(paths.watch.js, ['js']);
     gulp.watch(paths.watch.html).on('change', browserSync.reload);
     gulp.watch(paths.watch.js).on('change', browserSync.reload);
     gulp.watch(paths.watch.css).on('change', browserSync.reload);

 });

//очистка и заполнение папки app

 gulp.task('dist',['vendorjs','extjs','vendorcss','fonts','images'],function(){
     return gulp.src(paths.size.app)
         .pipe(plugins.size({title:'./app'}));
 });


//очитска директрии app
 gulp.task('clean', function(cb) {
     rimraf(paths.clean.app,cb );
 });

 //собираем внешние js
gulp.task('vendorjs',function(){
    gulp.src(['./bower/jquery/dist/jquery.min.js',
                './bower/jquery-ui/jquery-ui.min.js',
                './bower/select2/dist/js/select2.js',
                './bower/jquery.columnizer/src/jquery.columnizer.js'])
        .pipe(plugins.concat('vendor.min.js'))
        .pipe(plugins.uglify())
        .pipe(plugins.if(production,plugins.rename("vendor.min."+prodversion+".js")))
        .pipe(gulp.dest(paths.app.js));
});

//собираем внешние css
gulp.task('vendorcss',function(){
    gulp.src(['./bower/jquery-ui/themes/ui-lightness/jquery-ui.min.css',
              './bower/normalize-css/normalize.css',
              './bower/select2/dist/css/select2.min.css'])
        .pipe(plugins.concat('vendor.min.css'))
        .pipe(cleanCSS({compatibility: 'ie9'}))
        .pipe(plugins.if(production,plugins.rename("vendor.min."+prodversion+".css")))
        .pipe(gulp.dest(paths.app.css));
});
//дополнительно js в head
 gulp.task('extjs',function(){
     gulp.src(['./bower/modernizr/modernizr.js'
             ])
         .pipe(plugins.concat('ext.min.js'))
         .pipe(plugins.uglify())
         .pipe(plugins.if(production,plugins.rename("ext.min."+prodversion+".js")))
         .pipe(gulp.dest(paths.app.js));
 });

 //копируем фонты
 gulp.task('fonts',function(){
     gulp.src(paths.source.fonts)
         .pipe(gulp.dest(paths.app.fonts));
 });

 //копируем картинки (спрайты все тоже там)
 gulp.task('images',function(){
     gulp.src(paths.source.images)
         .pipe(gulp.dest(paths.app.images));
 });

