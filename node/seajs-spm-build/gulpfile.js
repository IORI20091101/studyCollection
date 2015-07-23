var SRC        = 'app/public' ,
    DIST       = 'app/build' ,
    CDN        = 'app/cdn' ,

    // 如果不是假值，那么这个值会作为 cdn 前缀追加到需要加载的文件里。
    // 注意：最后面的斜线 / 一定要加上
    CDN_PREFIX = 'http://localhost:3030/' ,
    //CDN_PREFIX = 'http://localhost:61111/angularjs-requirejs-rjs-md5/cdn/' ,
    //CDN_PREFIX = false ,
    paths      = {
        // 默认情况下所有 css 文件都是要加前缀的，但是由 requireJS 加载的 css 文件不用加
        cssLoadByRequireJS : [ /^styles\/.*/ ] ,

        js : [
            DIST + '/**/*.js'
        ] ,
        cssFiles : [ DIST + '/**/*.css' ] ,
        htmlFiles : DIST + '/**/*.html' ,
        imageFiles : DIST + '/**/*.{png,jpg,gif}' ,
        //传入gulp.src 的参数需要格式为vinyl-fs 的流文件，参数格式为['./js/**/*.js', '!./js/vendor/*.js'] 所以要加！号
        copyFiles : [ DIST + '/**/*' , '!' + DIST + '/**/*.{js,css,html}' , '!' + DIST + '/build.txt' ]
    } ,

    gulp       = require( 'gulp' ) ,
    minifyJS   = require( 'gulp-uglify' ) ,
    minifyCSS  = require( 'gulp-minify-css' ) ,
    minifyHTML = require( 'gulp-htmlmin' ) ,

    seajsCombo = require("gulp-seajs-combo"),

    transport  = require("gulp-seajs-transport"),

    //changed    = require( 'gulp-changed' ) ,
    concat     = require( 'gulp-concat' ) ,
    deleteFile = require( 'del' ) ,
    revall     = new (require( 'gulp-rev-all' ))( {
        //定义不需要重命名的文件，比如requirejs的配置文件boot.js, 服务器端配置的静态模板或者html的文件不能修改否则娶不到
        //还有requiire文件本身，都不需要更改md5值
        dontRenameFile : [ /^\/views\/html\/index\w*\.html$/g , /^\/fonts\/.*/g ,'vendor/require.js','scripts/boot.js'] ,
        //这里的搜索指的是将所有引用文件的原文件名改成 修改后的md5值，比如define(['a']) ==> defind(['hash'])
        dontSearchFile : [ /^\/scripts\/libs\/.*/g ] ,
        //修改文件名字的规则
        transformFilename : function ( file , hash ) {
            return hash + file.path.slice( file.path.lastIndexOf( '.' ) );
        } ,
        //修改文件路径
        transformPath : function ( rev , source , file ) {
            //if ( rev !== file.revPath ) {
            //    console.log( 'debugger here' );
            //}
            if ( CDN_PREFIX ) {
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
                // 其他文件一律加前缀
                return CDN_PREFIX + filePath;
            } else {
                return rev;
            }
        }
    } );

gulp.task( 'clean' , clean );


//gulp.task('seajsCombo', combo);

gulp.task("transport", transport);

gulp.task( 'js' ,['transport'] , js );

gulp.task( 'css',['js'] , css );

gulp.task( 'html' ,['js'], html );

gulp.task( 'copy',['js'] , copy );



// 第三步：将 DIST 文件夹下的文件打上 md5 签名并输出到 CDN 文件夹
gulp.task( 'default' , ['js' , 'css' , 'html' , 'copy' ] , md5 );

function clean( cb ) {
    deleteFile( [ DIST  , CDN ] , cb );
}

function js() {
    return gulp.src( paths.js )
        //.pipe( changed( DIST ) )
        .pipe( minifyJS() )
        .pipe( gulp.dest( DIST ) );
}

function css() {
    return gulp.src( paths.cssFiles )
        //.pipe( changed( DIST ) )
        .pipe( minifyCSS() )
        .pipe( gulp.dest( DIST ) );
}

function html() {
    return gulp.src( paths.htmlFiles , { base : CDN } )
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

function transport() {

    return gulp.src(SRC + "/**/*.js")
            .pipe(transport())
            .pipe(gulp.dest(DIST));

}

function combo() {
    return gulp.src( './app/public/scripts/index.js' )
        .pipe( seajsCombo() )
        .pipe( gulp.dest(DIST) );
}


function md5() {
    return gulp.src( DIST + '/**' )
        //.pipe( revall.revision() )
        //.pipe( gulp.dest( CDN ) )
        //.pipe( revall.manifestFile() )
        .pipe( gulp.dest( CDN ) );
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
