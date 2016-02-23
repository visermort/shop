 "use strict";

 var gulp        = require('gulp');
 var browserSync = require('browser-sync').create();
 var autoprefixer = require('gulp-autoprefixer');
 var plumber = require('gulp-plumber');
 var jade = require('gulp-jade');
 //var wiredep = require('wiredep').stream;
 var compass = require('gulp-compass');
 var jadePath = 'jade/*.jade';

 //gulp.task('wiredep', function() {
 //    gulp.src('app/*.html')
 //        .pipe(wiredep({
 //            ignorePath:/^(\.\.\/)*\.\./
 //        }))
 //        .pipe(gulp.dest('app'));
 //});

 //gulp.task('compass', function() {
 //    //return
 //       gulp.src('sass/index.scss')
 //
 //        .pipe(plumber())
 //        .pipe(compass({
 //            config_file: './config.rb',
 //            css: 'app/css',
 //            sass: 'scss'
 //        }))
 //    //    .pipe(autoprefixer('last 5 versions'))
 //        .pipe(gulp.dest('app/css'))
 //        .pipe(browserSync.stream());
 //});

 gulp.task('compass', function() {
     gulp.src('./sass/*.scss')
         .pipe(compass({
             config_file: './config.rb',
             css: 'css',
             sass: 'scss'
         }))
         .pipe(gulp.dest('app/css'));
 });



 gulp.task('jade', function() {
     var YOUR_LOCALS = {};

     gulp.src(jadePath)
         .pipe(plumber())
         .pipe(jade({
             locals: YOUR_LOCALS,
             pretty : '\t',
         }))
         .pipe(gulp.dest('app'))
 });

 // Static Server + watching scss/html files
 gulp.task('server', function() {
       browserSync.init({
         server: "./app"
     });

   //  gulp.watch("sass/**/*.scss", ['compass']);
     gulp.watch(jadePath, ['jade']);
     gulp.watch("app/*.html").on('change', browserSync.reload);
     gulp.watch("app/js/*.js").on('change', browserSync.reload);

 });


 gulp.task('default', ['server']);

 //gulp.task('startcompass',['compass'],function() {
 //    gulp.watch("sass/**/*.scss", ['compass']);
 //
 //});
