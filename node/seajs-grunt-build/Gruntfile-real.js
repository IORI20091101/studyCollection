module.exports = function(grunt){

    /*
     grunt-contrib-clean：删除文件。
     grunt-contrib-compass：使用compass编译sass文件。
     grunt-contrib-concat：合并文件。
     grunt-contrib-copy：复制文件。
     grunt-contrib-cssmin：压缩以及合并CSS文件。
     grunt-contrib-imagemin：图像压缩模块。
     grunt-contrib-jshint：检查JavaScript语法。
     grunt-contrib-uglify：压缩以及合并JavaScript文件。
     grunt-contrib-watch：监视文件变动，做出相应动作。
     */
    /**页面中的入口文件最好用绝对路径/scripts/concat/router
     之所以这样是因为，seajs的文件transport后id跟路径必须是一致的否则加载不到文件
     在一个原因是如果相对路径./concat/router 这样改成md5文件名后，不能更根据设置匹配规则匹配到
     最好的解决方法就是，入口文件和异步加载的文件最好写绝对路径
     */

    var source = "WebRoot/asource/",

        build = "WebRoot/.build/",

        minify = "WebRoot/.minify/",

    //js最终目录
        cdn ="WebRoot/";

    grunt.initConfig({
        transport : {
            options : {
                paths: ["WebRoot/asource/"],
                debug : false, //disable output debug file
                alias : {
                    "jquery" : "/vendor/jquery.js"
                },
                //id与路径一定要相符合 否则加载不到
                idleading: '/public/'
            },
            application : {
                files: [{
                    expand:true,
                    cwd: 'WebRoot/asource/public/',
                    src: '**/*.js',
                    dest: 'WebRoot/.build/public'
                }]
            }
        },
        concat : {
            main : {
                options : {
                    relative : true
                },
                files : {
                    // 合并.build/application.js文件到dist/application.js中
                    'WebRoot/.minify/public/main/router.js' : [
                            build+'public/main/router.js',
                            build+'public/main/js/view/index-view.js',
                            build+'public/main/js/view/category-view.js',
                            build+'public/main/js/tmpl/index-tmpl.js',
                            build+'public/main/js/tmpl/category-tmpl.js',
                            build+'public/core/js/core/countdown.js'
                    ],
                    'WebRoot/.minify/public/active/router.js':[
                            build+'public/active/router.js',
                            build+'public/active/js/view/active-view.js',
                            build+'public/active/js/view/hot-view.js',
                            build+'public/active/js/view/limit-view.js',
                            build+'public/active/js/view/newly-view.js'
                    ],
                    'WebRoot/.minify/public/help/router.js':[
                            build+'public/help/router.js',
                            build+'public/help/js/view/about-view.js',
                            build+'public/help/js/view/problem-view.js',
                            build+'public/help/js/view/returnProcess-view.js'
                    ],
                    'WebRoot/.minify/public/order/router.js':[
                            build+'public/order/router.js',
                            build+'public/order/js/view/sure-view.js',
                            build+'public/order/js/view/coupon-view.js',
                            build+'public/order/js/tmpl/sure-tmpl.js',
                            build+'public/order/js/tmpl/coupon-tmpl.js'
                    ],
                    'WebRoot/.minify/public/product/router.js':[
                            build+'public/product/router.js',
                            build+'public/product/js/view/detail-view.js',
                            build+'public/product/js/tmpl/detail-tmpl.js',
                            build+'public/core/js/core/router.js'
                    ],
                    'WebRoot/.minify/public/passport/log.js':[
                            build+'public/passport/log.js'
                    ],
                    'WebRoot/.minify/public/passport/reg.js':[
                            build+'public/passport/reg.js'
                    ]

                }
            }
        },
        uglify : {
            options:{
                mangle: false
            },
            main : {
                files: [{
                    expand: true,
                    cwd: 'WebRoot/.minify',
                    src: '**/*.js',
                    dest:'WebRoot/'
                }]
            },
            vendor:{
                files:{
                    'WebRoot/public/core/js/lib/vendor.js' : [
                            source+'public/core/js/lib/jquery/jquery-min.js',
                            source+'public/core/js/lib/jquery/jquery.mobile-1.4.5.min.js',
                            source+'public/core/js/lib/jquery/jquery.scrollLoading.js',
                            source+'public/core/js/lib/underscore/underscore-min.js',
                            source+'public/core/js/lib/juicer/juicer.js',
                            source+'public/core/js/lib/backbone/backbone-min.js',
                            source+'public/core/js/lib/seajs/sea.js',
                            source+'public/core/js/lib/seajs/seajs-css.js',
                            source+'public/core/js/lib/dialog.js'
                    ]
                }
            }

        },
        copy :{
            main: {
                files: [
                    // includes files within path
                    {
                        expand: true,
                        cwd: 'WebRoot/asource/public/core/js/lib',
                        src: ['**'],
                        dest: 'WebRoot/.build/public/core/js/lib',
                        filter: 'isFile'
                    }
                ]
            },
            images: {
                files: [
                    // includes files within path
                    {
                        expand: true,
                        cwd: 'WebRoot/asource/',
                        src: ['activity/**','css/**','fonts/**','img/**','pages/**','*.{html,jsp}','js/**'],
                        dest: 'WebRoot/',
                        filter: 'isFile'
                    }
                ]
            }

            /*,
             cssFile:{
             files:[
             {
             expand: true,
             cwd: 'app/public/styles/',
             src: ['**'],
             dest: 'app/cdn/styles',
             filter: 'isFile'
             }
             ]
             }*/
        },

        cssmin: {
            //多个css压缩成一个 这种可以放到一开始的时候一个整体的压缩包
            /*options: {
             shorthandCompacting: false,
             roundingPrecision: -1
             },
             combinMini: {
             files: {
             'app/cdn/styles/index.css': ['app/public/styles/index.css', 'app/public/styles/normalize.css','app/public/styles/main.css']
             }
             }*/
            target: {
                files: [{
                    expand: true,
                    cwd: 'WebRoot/asource',
                    src: ['**/*.css'],
                    dest: 'WebRoot/',
                    ext: '.css'
                }]
            }
        },
        imagemin: {                          // Task
            dynamic: {
                options: {
                    optimizationLevel: 3 //定义 PNG 图片优化水平
                },                     // Another target
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: 'app/public/images/',                   // Src matches are relative to this path
                    src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
                    dest: 'app/cdn/images/'                  // Destination path prefix
                }]
            }
        },
        filerev: {
            options: {
                algorithm: 'md5',
                length: 8,
                //这里处理文件名字生成规则
                process: function(basename, name, extension) {
                    grunt.log.write(basename+'\n');
                    grunt.log.write(name+'\n');
                    grunt.log.write(extension +'\n');
                    grunt.log.write('\n');
                    return basename+'.'+name + '.' + extension;
                }
            },
            assets: {
                files: [{
                    src: [
                        'WebRoot/img/**/*.{jpg,jpeg,gif,png}',
                        'WebRoot/css/**/*.css',
                        'WebRoot/fonts/**/*.{eot,svg,ttf,woff}',
                        'WebRoot/public/**/*.{js,css}'
                    ]
                }]
            }
        },
        /*useminPrepare: {
         html: 'app/cdn/views/index.html',
         options: {
         dest: 'app/cdn',
         root: '.'
         }
         },*/

        usemin: {
            options: {
                //上级目录可以 使用app/cdn/scripts 失败
                assetsDirs: ['WebRoot/'],
                patterns: {
                    html: [
                        [/seajs\.use\(['"]([^"']+)["']\)/gm,'replace html seajs use',
                            function (m) {
                                return m.match(/\.js$/) ? m : m + '.js';
                            },
                            function (m) {
                                return m.replace('.js', '');
                            }
                        ]
                    ],
                    js: [
                        [/define\(['"]([^"']+)['"]/gm,'replace js define use',
                            function (m) {
                                return m.match(/\.js$/) ? m : m + '.js';
                            },
                            function (m) {
                                return m.replace('.js', '');
                            }
                        ],
                        [/async\(['"]([^"']+)['"]/gm,'replace js define use',
                            function (m) {
                                return m.match(/\.js$/) ? m : m + '.js';
                            },
                            function (m) {
                                return m.replace('.js', '');
                            }
                        ],
                        [/seajs\.use\(['"]([^"']+)["']\)/gm,'replace html seajs use',
                            function (m) {
                                return m.match(/\.css$/) ? m : m + '.css';
                            }
                        ],
                        [/require\(['"]([^"']+)['"]/gm,'replace js define use',
                            function (m) {
                                return m.match(/\.js$/) ? m : m + '.js';
                            },
                            function (m) {
                                return m.replace('.js', '');
                            }
                        ],
                        [
                            /<img[^\>]*[^\>\S]+src=['"]([^'"\)#]+)(#.+)?["']/gm,
                            'Update the HTML with the new img filenames'
                        ],
                    ],
                    jsp: [
                        [
                            /<script.+src=['"]([^"']+)["']/gm,
                            'Update the HTML to reference our concat/min/revved script files'
                        ],
                        [
                            /<link[^\>]+href=['"]([^"']+)["']/gm,
                            'Update the HTML with the new css filenames'
                        ],
                        [
                            /<img[^\>]*[^\>\S]+src=['"]([^'"\)#]+)(#.+)?["']/gm,
                            'Update the HTML with the new img filenames'
                        ],
                        [
                            /<video[^\>]+src=['"]([^"']+)["']/gm,
                            'Update the HTML with the new video filenames'
                        ],
                        [
                            /<video[^\>]+poster=['"]([^"']+)["']/gm,
                            'Update the HTML with the new poster filenames'
                        ],
                        [
                            /<source[^\>]+src=['"]([^"']+)["']/gm,
                            'Update the HTML with the new source filenames'
                        ],
                        [
                            /data-main\s*=['"]([^"']+)['"]/gm,
                            'Update the HTML with data-main tags',
                            function (m) {
                                return m.match(/\.js$/) ? m : m + '.js';
                            },
                            function (m) {
                                return m.replace('.js', '');
                            }
                        ],
                        [
                            /data-(?!main).[^=]+=['"]([^'"]+)['"]/gm,
                            'Update the HTML with data-* tags'
                        ],
                        [
                            /url\(\s*['"]?([^"'\)]+)["']?\s*\)/gm,
                            'Update the HTML with background imgs, case there is some inline style'
                        ],
                        [
                            /<a[^\>]+href=['"]([^"']+)["']/gm,
                            'Update the HTML with anchors images'
                        ],
                        [
                            /<input[^\>]+src=['"]([^"']+)["']/gm,
                            'Update the HTML with reference in input'
                        ],
                        [
                            /<meta[^\>]+content=['"]([^"']+)["']/gm,
                            'Update the HTML with the new img filenames in meta tags'
                        ],
                        [
                            /<object[^\>]+data=['"]([^"']+)["']/gm,
                            'Update the HTML with the new object filenames'
                        ],
                        [
                            /<image[^\>]*[^\>\S]+xlink:href=['"]([^"'#]+)(#.+)?["']/gm,
                            'Update the HTML with the new image filenames for svg xlink:href links'
                        ],
                        [
                            /<image[^\>]*[^\>\S]+src=['"]([^'"\)#]+)(#.+)?["']/gm,
                            'Update the HTML with the new image filenames for src links'
                        ],
                        [
                            /<(?:img|source)[^\>]*[^\>\S]+srcset=['"]([^"'\s]+)\s*?(?:\s\d*?[w])?(?:\s\d*?[x])?\s*?["']/gm,
                            'Update the HTML with the new image filenames for srcset links'
                        ],
                        [
                            /<(?:use|image)[^\>]*[^\>\S]+xlink:href=['"]([^'"\)#]+)(#.+)?["']/gm,
                            'Update the HTML within the <use> tag when referencing an external url with svg sprites as in svg4everybody'
                        ],
                        [/seajs\.use\(['"]([^"']+)["']\)/gm,'replace html seajs use',
                            function (m) {
                                return m.match(/\.js$/) ? m : m + '.js';
                            },
                            function (m) {
                                return m.replace('.js', '');
                            }
                        ]
                    ]
                }
            },
            html: ['WebRoot/**/*.html', '!WebRoot/asource/**/*.html'],
            jsp: ['WebRoot/**/*.jsp', '!WebRoot/asource/**/*.jsp'],
            css: ['WebRoot/**/*.css', '!WebRoot/asource/**/*.css'],
            js: ['WebRoot/public/**/*.js']
        },
        clean : {
            build : ["WebRoot/activity","WebRoot/css","WebRoot/fonts","WebRoot/img","WebRoot/js","WebRoot/pages","WebRoot/public","WebRoot/*.{html,jsp}",build,minify] //清除.build文件
        }
    });
    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-cmd-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-filerev');
    grunt.loadNpmTasks('grunt-usemin');
    //grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default',['clean','transport','copy','concat','uglify','cssmin','filerev','usemin'])
};