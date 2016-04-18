var SRC        = 'app/public' ,
    COMPILE  = 'app/.compile' , //编译sass typescript的路径
    BUILD       = 'app/.build' ,
    DEST        = 'app/dest' ,

    gulp       = require( 'gulp' ) ,
    minifyJS   = require( 'gulp-uglify' ) ,
    minifyHTML = require( 'gulp-htmlmin' ) ,

    //changed    = require( 'gulp-changed' ) ,
    concat     = require( 'gulp-concat' ) ,

    deleteFile = require( 'del' );

var requirejsOptimize = require('gulp-requirejs-optimize');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
//控制task执行顺序
var runSequence = require('run-sequence');

var fs = require("fs");

var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');


//执行clean命令
gulp.task( 'clean' , clean );


gulp.task( 'requireBoot' , requireBoot );
gulp.task( 'requireSms' , requireSms );
gulp.task( 'requireConcat' , requireConcat );

//第一步处理requirejs文件到dest 并且进行压缩
gulp.task( 'requirejs', ['requireBoot', 'requireSms','requireConcat'] ,function() {} );

gulp.task('concatjs' , concatjs);

//第二步合并js文件并且进行压缩
gulp.task( 'compressjs',['concatjs'] ,compressjs );



//编译sass文件成为css文件
gulp.task( 'compilesass' , compilesass );


//时时监听sass文件变化进行编译 暂时不用
gulp.task('sass:watch', function () {
  gulp.watch(SRC + '/styles/**/*.scss', ['compilesass']);
});


//第三步编译sass文件并且进行压缩css
gulp.task( 'compresscss',['compilesass'] , compresscss );

gulp.task( 'compresshtml', compresshtml );

// gulp.task( 'copy' , copy );

gulp.task('md5',md5);

gulp.task('revController', revController);

// 第三步：将 DIST 文件夹下的文件打上 md5 签名并输出到 CDN 文件夹,回调函数删除已修改文件名字的原始文件
gulp.task( 'default' , function(callback) {
    runSequence('clean', 'requirejs', 'compressjs','compresscss', 'compresshtml', 'md5','revController', function() {

//读取manifest路径删除被修改的文件
        fs.readFile(DEST + '/rev-manifest.json','utf-8', function (err, data) {
          if (err) throw err;

          var jsonObj = JSON.parse(data);

          var fileArr = [];
          console.log(typeof jsonObj);
          for( var o in jsonObj ) {
            fileArr.push(DEST + '/' + o);
          }

          deleteFile(fileArr);
        });
    });

});

gulp.task( 'real' , function(callback) {
    runSequence('clean', 'requirejs', 'compressjs','compresscss', 'compresshtml', 'md5','revController', function() {

//读取manifest路径删除被修改的文件
        fs.readFile(DEST + '/rev-manifest.json','utf-8', function (err, data) {
          if (err) throw err;

          var jsonObj = JSON.parse(data);

          var fileArr = [];
          console.log(typeof jsonObj);
          for( var o in jsonObj ) {
            fileArr.push(DEST + '/' + o);
          }

          deleteFile(fileArr);
        });
    });

});



function clean( cb ) {
    return deleteFile( [ DEST , COMPILE, BUILD ] , cb );
}

function concatjs() {
    return gulp.src([
            SRC+'/vendor/juicer-min.js',
            SRC+'/vendor/underscore.js',
            SRC+'/vendor/main.js',
            SRC+'/vendor/require.js'
        ])
        .pipe(concat("base.js"))
        .pipe(gulp.dest(DEST+'/vendor'));
}


function compressjs() {
    return gulp.src( DEST + '/vendor/*.js' )
        .pipe( minifyJS() )
        .pipe( gulp.dest( DEST + '/vendor' ) );
}


function compilesass() {

        return gulp.src( SRC + '/styles/sass/**/*.scss')
              .pipe(sourcemaps.init())
              .pipe(sass().on('error', sass.logError))
              // .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
              .pipe(sourcemaps.write('../maps'))
              .pipe(gulp.dest( DEST + '/styles'));
}

function compresscss() {
    return gulp.src( DEST + '/styles/*.css'  )
        //.pipe( changed( DIST ) )
        .pipe(sourcemaps.init())
        .pipe( cleanCSS({compatibility: 'ie8', debug: true}, function(details) {
            console.log(details.name + " : " + details.stats.originalSize);
            console.log(details.name + " : " + details.stats.minifiedSize);
        }) )
        .pipe(sourcemaps.write('../maps'))
        .pipe( gulp.dest( DEST + '/styles' ) );

}

function compresshtml() {
    return gulp.src(SRC + '/views/**/*.html')
        .pipe( minifyHTML( {
            removeComments : true ,
            collapseWhitespace : true
        } ) )
        .pipe( gulp.dest( DEST + '/views' ) );
}

function copy() {
    return gulp.src( paths.copyFiles )
        //.pipe( changed( DIST ) )
        .pipe( gulp.dest( DEST ) );
}


function md5() {
    return gulp.src( [
            DEST + '/styles/**/*.css',
            DEST + '/scripts/**/*.js',
            DEST + '/vendor/**/*.js',
            DEST + '/images/**/*.{png,jpg,gif}'
        ],{
            base: DEST,
            transformer: function(file) {
                // save the old path for later
                file.revOrigPath = file.path;
                file.revOrigBase = file.base;
                file.revHash = revHash(file.contents);

                file.path = modifyFilename(file.path, function (filename, extension) {
                    var extIndex = filename.indexOf('.');

                    filename = extIndex === -1 ?
                        revPath(filename, file.revHash) :
                        revPath(filename.slice(0, extIndex), file.revHash) + filename.slice(extIndex);
console.log(filename);
                    return filename + extension;
                });
            }
        })
        .pipe( rev() )
        .pipe( gulp.dest( DEST ) )
        .pipe( rev.manifest() )
        .pipe( gulp.dest( DEST ) );
}

function revController() {
    return gulp.src([
            DEST + '/**/*.json',
            DEST + '/views/**/*.html'
        ])
        .pipe( revCollector({
            replaceReved: true,
            dirReplacements: {
            }
        }) )
        .pipe(gulp.dest(DEST));
}


// requirejs将模块分开配置这样可以解决 concat
function requireBoot( done ) {


    return gulp.src([

            SRC+'/scripts/boot.js',
        ])
        .pipe(requirejsOptimize(function(file) {
            return {
                name:"scripts/boot",
                optimize: 'none',
                useStrict: true,
                baseUrl: SRC,
                paths:{
                    jquery: 'vendor/jquery-2.1.4',
                    backbone:'vendor/backbone',
                    underscore:'vendor/underscore'
                },

                shim: {
                    'backbone':['underscore','jquery']
                }
            };
        }))
        .pipe(sourcemaps.write(DEST+"/maps"))
        .pipe(gulp.dest(DEST+'/scripts'));
}




// requirejs将模块分开配置这样可以解决 concat
function requireConcat(done) {
    return gulp.src([
        SRC+'/scripts/concat/router.js'
    ])
    .pipe(requirejsOptimize(function(file) {
        return {
            name:"scripts/concat/router",
            optimize: 'none',
            useStrict: true,
            baseUrl: SRC,
            paths:{
                jquery: 'vendor/jquery-2.1.4',
                backbone:'vendor/backbone',
                underscore:'vendor/underscore'
            },

            shim: {
                'backbone':['underscore','jquery']
            }
        };
    }))
    .pipe(sourcemaps.write(DEST+"/maps"))
    .pipe(gulp.dest(DEST+'/scripts/concat'));
}

// requiresjs将模块分开配置这样可以解决 sms模块
function requireSms(done) {
    return gulp.src([

        SRC+'/scripts/sms/router.js'
    ])
    .pipe(requirejsOptimize(function(file) {
        return {
            name:"scripts/sms/router",
            optimize: 'none',
            useStrict: true,
            baseUrl: SRC,
            paths:{
                jquery: 'vendor/jquery-2.1.4',
                backbone:'vendor/backbone',
                underscore:'vendor/underscore'
            },

            shim: {
                'backbone':['underscore','jquery']
            }
        };
    }))
    .pipe(sourcemaps.write(DEST+"/maps"))
    .pipe(gulp.dest(DEST+'/scripts/sms'));
}




/**
 * 匹配一个数组，数组可能有正则
 * @param {String} value - 要匹配的值
 * @param {Array} arr - 匹配数组
 * @returns {boolean} - 有一个匹配项则返回 true，否则返回 false
 */
function matchArray( value , arr ) {
    return arr.some( function ( v ) {
        if ( 'string' === typeof v ) {
            return v === value;
        }
        return v.test( value );
    } );
}