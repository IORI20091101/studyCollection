
var path = require('path'),
    gulp       = require( 'gulp' ) ,
    minifyJS   = require( 'gulp-uglify' ) ,
    minifyCSS  = require( 'gulp-minify-css' ) ,
    minifyHTML = require( 'gulp-htmlmin' ) ,
    concat     = require( 'gulp-concat' ) ,
    deleteFile = require( 'del' ) ,
    revall     = new (require( 'gulp-rev-all' ))( {
        //定义不需要重命名的文件，比如requirejs的配置文件boot.js, 服务器端配置的静态模板或者html的文件不能修改否则娶不到
        //还有requiire文件本身，都不需要更改md5值
        dontRenameFile : [ /^\/views\/index\w*\.html$/g /*,'vendor/require.js','scripts/boot.js'*/] ,
        //这里的搜索指的是将所有引用文件的原文件名改成 修改后的md5值，比如define(['a']) ==> defind(['hash'])
        dontSearchFile : [ /^\/scripts\/libs\/.*/g ] ,
        //修改文件名字的规则 生成index.b2bxbsd.js类似这样的文件名
        transformFilename : function ( file , hash ) {
            //return hash + file.path.slice( file.path.lastIndexOf( '.' ) );
            var ext = path.extname(file.path);
            return path.basename(file.path, ext) + '.' + hash.substr(0,8) + ext ;
        } ,
        annotator : function(contents, path) {
            var fragments = [{'contents': contents}];
            return fragments;
        },
        replacer : function(fragment, replaceRegExp, newReference, referencedFile) {

console.log(newReference);
console.log(referencedFile.revPathOriginal);
            var replaceStr = replaceRegExp+'';

            doorList.forEach(function(v) {
                var vArr = v.split('/');
                var vStrFinal = "";
                vArr.forEach(function(val) {
                   vStrFinal += val + "\\" + "/";
                })

                vStrFinal = vStrFinal.slice(0, - 2);

                if( replaceStr.indexOf(vStrFinal) > 0 ) {

                    //console.log(replaceRegExp);

                    var repStr1 =replaceStr.slice(0,4);
                    var repStr2 =replaceStr.slice(4);
                    //console.log(repStr1);
                    //console.log(repStr2);

                    //var replaceFinal = repStr1 + "define\('|" + 'define\("|' + repStr2;
//console.log(fragment.contents);

                    //console.log(replaceFinal);
                    //console.log(replaceRegExp);
                }
            })
             fragment.contents = fragment.contents.replace(replaceRegExp, '$1' + newReference + '$3$4');
        },
        hashLength: 8,
        //修改文件路径 这里感觉不需要配置
        transformPath : function ( rev , source , file ) {
            //if ( rev !== file.revPath ) {
            //    console.log( 'debugger here' );
            //}

            //console.log(rev);

            return rev;
            /*if ( CDN_PREFIX ) {
                var filePath = file.revPathOriginal.slice( file.base.length ).replace( /\\/g , '/' ) ,
                    ext      = file.revFilenameExtOriginal;

                // 不是由 requireJS 加载的 js 文件要加前缀，由 requireJS 加载的 css 文件不要加前缀
                if (
                    ('.js' === ext && !matchArray( filePath , paths.jsNotLoadByRequireJS ))
                    ||
                    ('.css' === ext && matchArray( filePath , paths.cssLoadByRequireJS ))
                ) {
                    return rev;
                }

                return CDN_PREFIX + filePath;
            } else {
                return rev;
            }*/
        }
    } );


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

// 第三步：将 DIST 文件夹下的文件打上 md5 签名并输出到 CDN 文件夹
gulp.task( 'default' , ['js' , 'css' , 'html' , 'copy' ] , md5 );

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

function md5() {
    return gulp.src( DIST + '/**' )
        .pipe( revall.revision() )
        .pipe( gulp.dest( CDN ) )
        .pipe( revall.manifestFile() )
        .pipe( gulp.dest( CDN ) );
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
