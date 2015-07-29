
var path = require('path'),
    gulp       = require( 'gulp' ) ,
    minifyJS   = require( 'gulp-uglify' ) ,
    minifyCSS  = require( 'gulp-minify-css' ) ,
    minifyHTML = require( 'gulp-htmlmin' ) ,
    concat     = require( 'gulp-concat' ) ,
    deleteFile = require( 'del' ) ,
    revReplace = require('gulp-rev-replace'),
    rev = require('gulp-rev');


var SRC        = 'app/public' ,
    REQUIREJS  = 'app/.requirejs' , //require 处理后的文件存放路径
    DIST       = 'app/.build' , //压缩完毕的css，js存放路径
    CDN        = 'app/cdn' , //最终生成的文件存放路径
    doorList = [
        'sms/router',
        'concat/router'
    ],
    // 如果不是假值，那么这个值会作为 cdn 前缀追加到需要加载的文件里。
    // 注意：最后面的斜线 / 一定要加上
    CDN_PREFIX = 'http://localhost:3030/' ,
    //CDN_PREFIX = 'http://localhost:61111/angularjs-requirejs-rjs-md5/cdn/' ,
    //CDN_PREFIX = false ,
    paths      = {

        // 非require引用的文件，直接在页面引用到文件，如果根据文件更改引用
        //jsNotLoadByRequireJS : [ 'scripts/boot.js' , 'vendor/require.js' ] ,

        // 默认情况下所有 css 文件都是要加前缀的，但是由 requireJS 加载的 css 文件不用加
        //cssLoadByRequireJS : [ /^styles\/.*/ ] ,

        js : [
            REQUIREJS + '/**/*.js'
        ] ,
        cssFiles : [ REQUIREJS + '/**/*.css' ] ,
        htmlFiles : REQUIREJS + '/**/*.html' ,
        imageFiles : REQUIREJS + '/**/*.{png,jpg,gif}' ,
        //传入gulp.src 的参数需要格式为vinyl-fs 的流文件，参数格式为['./js/**/*.js', '!./js/vendor/*.js'] 所以要加！号
        copyFiles : [ REQUIREJS + '/**/*' , '!' + REQUIREJS + '/**/*.{js,css,html}' , '!' + REQUIREJS + '/build.txt' ]
    };



gulp.task( 'clean' , clean );

gulp.task( 'requirejs',['clean'], requirejs ); //第一步： 从 SRC 把文件合并至 REQUIREJS 文件夹

// 第二步：下面四个操作是并行的，用于将 REQUIREJS 文件夹下的文件精简至 DIST 文件夹
gulp.task( 'js' , [ 'requirejs' ] , js );

gulp.task( 'css' , [ 'requirejs' ] , css );

gulp.task( 'html' , [ 'requirejs' ] , html );

gulp.task( 'copy' , [ 'requirejs' ] , copy );

gulp.task( 'revname', ['requirejs'], revname );


// 第三步：将 DIST 文件夹下的文件打上 md5 签名并输出到 CDN 文件夹
gulp.task( 'default' , ['js' , 'css' , 'html' , 'copy' ,'revname'] , revReplaceUrl );

function clean( cb ) {
    deleteFile( [ DIST , REQUIREJS , CDN ] , cb );
}

function js() {
    return gulp.src( paths.js )
        //.pipe( minifyJS() )
        .pipe( gulp.dest( DIST ) );
}

function css() {
    return gulp.src( paths.cssFiles )
        //.pipe( minifyCSS() )
        .pipe( gulp.dest( DIST ) );
}

function html() {
    return gulp.src( paths.htmlFiles , { base : REQUIREJS } )
        /*.pipe( minifyHTML( {
            removeComments : true ,
            collapseWhitespace : true
        } ) )*/
        .pipe( gulp.dest( DIST ) );
}
function copy() {
    return gulp.src( paths.copyFiles )
        .pipe( gulp.dest( DIST ) );
}

function revname() {
    return gulp.src(DIST + '/**/*.*')
        .pipe(rev())
        .pipe(gulp.dest(CDN))
        .pipe(rev.manifest({
            base: CDN,
            merge: true // merge with the existing manifest (if one exists)
        }))
        .pipe(gulp.dest(CDN));

}

function revReplaceUrl() {
    var manifest = gulp.src("app/cdn/rev-manifest.json");

      return gulp.src("app/cdn/**/*.*")
        .pipe(revReplace({manifest: manifest}));
}

function md5() {
    /*return gulp.src( DIST + '/**' )
        .pipe( revall.revision() )
        .pipe( gulp.dest( CDN ) )
        .pipe( revall.manifestFile() )
        .pipe( gulp.dest( CDN ) );*/
}

function requirejs( done ) {
    var r = require( 'requirejs' );
    r.optimize( {
        appDir : SRC ,
        dir : REQUIREJS ,
        optimize : 'none' ,
        optimizeCss : 'none' ,
        removeCombined : true ,
        baseUrl:'./scripts/',
        paths:{
            jquery: '../vendor/jquery',
            backbone:'../vendor/backbone',
            underscore:'../vendor/underscore'
        },

        shim: {
            'backbone':['underscore','jquery']
        },
        modules: [
            {
                name: 'boot'
            },
            {
                name: 'concat/router'
            },
            {
                name: 'sms/router'
            }
        ],
        logLevel : 1
    } , function () {
        done();
    } );
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
