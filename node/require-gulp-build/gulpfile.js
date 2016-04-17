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


//执行clean命令
gulp.task( 'clean' , clean );


gulp.task( 'requireBoot' , requireBoot );
gulp.task( 'requireSms' , requireSms );
gulp.task( 'requireConcat' , requireConcat );

//第一步处理requirejs文件到dest 并且进行压缩
gulp.task( 'requirejs', ['requireBoot', 'requireSms','requireConcat'] ,requirejs );

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

gulp.task( 'html', html );

gulp.task( 'copy' , copy );

// 第三步：将 DIST 文件夹下的文件打上 md5 签名并输出到 CDN 文件夹
gulp.task( 'default' , ['compressjs' , 'css' , 'html' , 'copy' ] , md5 );

function clean( cb ) {
    deleteFile( [ DEST , COMPILE, BUILD ] , cb );
}

function concatjs() {
    return gulp.src([
            SRC+'/vendor/juicer-min.js',
            SRC+'/vendor/underscore.js',
            SRC+'/vendor/main.js'
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

        return gulp.src('./app/public/styles/sass/**/*.scss')
              .pipe(sourcemaps.init())
              .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
              .pipe(sourcemaps.write('./maps'))
              .pipe(gulp.dest('./app/dest/styles'));
}

function compresscss() {
    return gulp.src( DEST  )
        //.pipe( changed( DIST ) )
        .pipe( minifyCSS() )
        .pipe( gulp.dest( DIST ) );

}

function html() {
    return gulp.src( paths.htmlFiles , { base : REQUIREJS } )
        //.pipe( changed( DIST ) )
        .pipe( minifyHTML( {
            removeComments : true ,
            collapseWhitespace : true
        } ) )
        .pipe( gulp.dest( DIST ) );
}
function copy() {
    return gulp.src( paths.copyFiles )
        //.pipe( changed( DIST ) )
        .pipe( gulp.dest( DIST ) );
}

function md5() {
    return gulp.src( DIST + '/**' )
        .pipe( revall.revision() )
        .pipe( gulp.dest( CDN ) )
        .pipe( revall.manifestFile() )
        .pipe( gulp.dest( CDN ) );
}



function requirejs(done) {

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
    gulp.src([

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