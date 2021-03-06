/**
 * Created by sundongzhi on 16/7/5.
 */
/*
 * @Author: dmyang
 * @Date:   2015-06-16 15:19:59
 * @Last Modified by:   dmyang
 * @Last Modified time: 2016-03-28 10:27:11
 */

'use strict';

let gulp = require('gulp')
let webpack = require('webpack')

let gutil = require('gulp-util')

let webpackConf = require('./webpack.config')({debug: false});


let src = process.cwd() + '/public/src'
let assets = process.cwd() + '/public/dist'

// js check
gulp.task('hint', () => {
    let jshint = require('gulp-jshint')
    let stylish = require('jshint-stylish')

    return gulp.src([
        src + '/scripts/**/*.js'
    ])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
})

// clean assets
gulp.task('clean', () => {
    let del = require('del')

    return del([assets]);
})

// run webpack pack
gulp.task('pack', ['clean'], (done) => {
    webpack(webpackConf, (err, stats) => {
        if(err) throw new gutil.PluginError('webpack', err)
        gutil.log('[webpack]', stats.toString({colors: true}))
        done()
    })
})

// html process
gulp.task('default', ['pack'])
/*gulp.task('default', ['pack'], () => {
 let replace = require('gulp-replace')
 let htmlmin = require('gulp-htmlmin')

 return gulp
 .src(assets + '/*.html')
 // @see https://github.com/kangax/html-minifier
 .pipe(htmlmin({
 collapseWhitespace: true,
 removeComments: true
 }))
 .pipe(gulp.dest(assets))
 })*/

// deploy assets to remote server
gulp.task('deploy', () => {
    let sftp = require('gulp-sftp')

    return gulp.src(assets + '/**')
        .pipe(sftp({
            host: '[remote server ip]',
            remotePath: '/www/app/',
            user: 'foo',
            pass: 'bar'
        }))
})
