var SRC        = './app/public' ,
    COMPILE  = './app/.compile' , //编译sass typescript的路径
    BUILD       = './app/.build' ,
    DEST        = './app/dest' ,

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
var  gulpSequence = require('gulp-sequence');


var fs = require("fs");

var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');

var gulpCopy = require('gulp-copy');




//执行clean命令
gulp.task( 'clean' , function clean( cb ) {
    return deleteFile( [ DEST , COMPILE, BUILD ] , cb );
} );



//第一步处理requirejs文件到dest 并且进行压缩
gulp.task( 'requirejs', ['requireBoot', 'requireSms','requireConcat'] ,function() {} );

gulp.task('concatjs' , function concatjs() {
    return gulp.src([
            SRC+'/vendor/juicer-min.js',
            SRC+'/vendor/underscore.js',
            SRC+'/vendor/backbone-min.js',
            SRC+'/vendor/main.js',
            SRC+'/vendor/require.js'
        ])
        .pipe(concat("base.js"))
        .pipe(gulp.dest(DEST+'/vendor'));
});

//第二步合并js文件并且进行压缩
gulp.task( 'compressjs',['concatjs'] ,function compressjs() {
    return gulp.src( DEST + '/vendor/*.js' )
        .pipe( minifyJS() )
        .pipe( gulp.dest( DEST + '/vendor' ) );
} );



//编译sass文件成为css文件
gulp.task( 'compilesass' , function compilesass() {

        return gulp.src( SRC + '/styles/sass/**/*.scss')
              .pipe(sourcemaps.init())
              .pipe(sass().on('error', sass.logError))
              // .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
              .pipe(sourcemaps.write('../maps'))
              .pipe(gulp.dest( DEST + '/styles'));
} );


//时时监听sass文件变化进行编译 暂时不用
gulp.task('sass:watch', function () {
  gulp.watch(SRC + '/styles/**/*.scss', ['compilesass']);
});


//第三步编译sass文件并且进行压缩css
gulp.task( 'compresscss',['compilesass'] , function compresscss() {
    return gulp.src( DEST + '/styles/*.css'  )
        //.pipe( changed( DIST ) )
        .pipe(sourcemaps.init())
        .pipe( cleanCSS({compatibility: 'ie8', debug: true}, function(details) {
            console.log(details.name + " : " + details.stats.originalSize);
            console.log(details.name + " : " + details.stats.minifiedSize);
        }) )
        .pipe(sourcemaps.write('../maps'))
        .pipe( gulp.dest( DEST + '/styles' ) );

} );



gulp.task( 'compresshtml', function compresshtml() {
    return gulp.src(SRC + '/views/**/*.html')
        .pipe( minifyHTML( {
            removeComments : true ,
            collapseWhitespace : true
        } ) )
        .pipe( gulp.dest( DEST + '/views' ) );
} );

gulp.task( 'copy' , function copy() {
    return gulp.src( [SRC + '/views/html/index.html', SRC+'/styles/*.css',SRC+'/images/*.{jpg,png}' ] )
        //.pipe( changed( DIST ) )
        .pipe( gulpCopy( DEST + "/" ,{ prefix : 2 }));
} );

gulp.task('md5',function md5() {
    return gulp.src( [
            DEST + '/styles/**/*.css',
            DEST + '/scripts/**/*.js',
            DEST + '/vendor/**/*.js',
            DEST + '/images/**/*.{png,jpg,gif}'
        ],{
            base: DEST
        })
        .pipe( rev() )
        .pipe( gulp.dest( DEST ) )
        .pipe( rev.manifest() )
        .pipe( gulp.dest( DEST ) );
});

gulp.task('revMyFile',function revMyFile() {

    var manifest = gulp.src("./" + DEST + "/rev-manifest.json");

    return gulp.src(  DEST + '/**/*.*' )
        .pipe(revReplace({manifest: manifest}))
        .pipe(gulp.dest(DEST));

});

// 第三步：将 DIST 文件夹下的文件打上 md5 签名并输出到 CDN 文件夹,回调函数删除已修改文件名字的原始文件
gulp.task( 'default' , function(callback) {
    gulpSequence(['clean'], ['requirejs'], ['compressjs'],['compresscss'], ['copy'],['md5'], ['revMyFile'],function() {

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






//并行执行这个任务将入口文件封装
gulp.task( 'requireBoot' , function requireBoot( done ) {


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
} );
gulp.task( 'requireSms' , function requireSms(done) {
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
} );


gulp.task( 'requireConcat' , function requireConcat(done) {
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
} );