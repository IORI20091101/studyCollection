/**
 * Created by zhangliyuan on 16/1/5.
 */
module.exports = function(grunt) {
    var sourceFile = 'src/',//源文件
        targetFile = 'dist/',//目标文件
        transfromFile = '.';//临时文件

    // Project configuration.
    grunt.file.defaultEncoding = 'UTF-8';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat : {
            basic_and_extras: {
                files: {
                    'WebRoot/dist/app/core/base.js': [
                        'WebRoot/vendor/json/json2.js',
                        'WebRoot/vendor/jquery/dist/jquery.min.js',
                        'WebRoot/vendor/circle-progress.js',
                        'WebRoot/vendor/underscore/underscore-min.js',
                        'WebRoot/vendor/sweetalert/dist/sweetalert-dev.js',
                        'WebRoot/src/javascript/lib/iscroll.js',
                        'WebRoot/vendor/require.js'
                    ],
                    'WebRoot/dist/javascript/wap/core/base.js': [
                        'WebRoot/src/javascript/lib/json2/json2.js',
                        'WebRoot/src/javascript/lib/jquery/1.7.2/jquery-min.js',
                        'WebRoot/src/javascript/lib/jquery/jquery.rotate.min.js',
                        'WebRoot/src/javascript/lib/jquery/jquery.easing.1.3.js',
                        'WebRoot/src/javascript/lib/jquery/accounting.min.js',
                        'WebRoot/src/javascript/lib/cookie/cookie.min.js',
                        'WebRoot/src/javascript/lib/juicer/0.6.1/juicer-min.js',
                        'WebRoot/src/javascript/lib/underscore/1.3.3/underscore-min.js',
                        'WebRoot/src/javascript/lib/iscroll.js',
                        'WebRoot/src/javascript/core/core.js',
                        'WebRoot/src/javascript/wap/core.js'
                    ],
                    'WebRoot/dist/javascript/wap/sup-report-list.min.js': [
                        'WebRoot/src/javascript/wap/sup-report-list.js'
                    ],
                    'WebRoot/dist/javascript/wap/activityCenter.min.js': [
                        'WebRoot/src/javascript/wap/activityCenter.js'
                    ],
                    'WebRoot/dist/javascript/wap/ad-page.min.js': [
                        'WebRoot/src/javascript/wap/ad-page.js'
                    ],
                    'WebRoot/dist/javascript/wap/second-years.min.js': [
                        'WebRoot/src/javascript/wap/second-years.js'
                    ],
                    'WebRoot/dist/javascript/wap/borrow-list.min.js': [
                        'WebRoot/src/javascript/wap/borrow-list.js'
                    ],
                    'WebRoot/dist/javascript/wap/cash-sure.min.js': [
                        'WebRoot/src/javascript/wap/cash-sure.js'
                    ],
                    'WebRoot/dist/javascript/wap/download-detail.min.js': [
                        'WebRoot/src/javascript/lib/jquery/jquery.onepage-scroll.js',
                        'WebRoot/src/javascript/wap/annimation.js'
                    ],
                    'WebRoot/dist/javascript/wap/funplan-list.min.js': [
                        'WebRoot/src/javascript/wap/funplan-list.js'
                    ],
                    'WebRoot/dist/javascript/wap/funplan-detail.min.js': [
                        'WebRoot/src/javascript/wap/funplan-detail.js'
                    ],
                    'WebRoot/dist/javascript/wap/funplan-sure.min.js': [
                        'WebRoot/src/javascript/wap/funplan-sure.js'
                    ],
                    'WebRoot/dist/javascript/wap/goddess-festival.min.js': [
                        'WebRoot/src/javascript/wap/goddess-festival.js'
                    ],
                    'WebRoot/dist/javascript/wap/help.min.js': [
                        'WebRoot/src/javascript/wap/help.js'
                    ],
                    'WebRoot/dist/javascript/wap/mylongdai-income.min.js': [
                        'WebRoot/src/javascript/wap/mylongdai-income.js'
                    ],
                    'WebRoot/dist/javascript/wap/index.min.js': [
                        'WebRoot/src/javascript/wap/index.js'
                    ],
                    'WebRoot/dist/javascript/wap/register-landing.min.js': [
                        'WebRoot/src/javascript/wap/register-landing.js'
                    ],
                    'WebRoot/dist/javascript/wap/lending-detail.min.js': [
                        'WebRoot/src/javascript/wap/lending-detail.js'
                    ],
                    'WebRoot/dist/javascript/wap/lending-sure.min.js': [
                        'WebRoot/src/javascript/wap/lending-sure.js'
                    ],
                    'WebRoot/dist/javascript/wap/login.min.js': [
                        'WebRoot/src/javascript/wap/login.js'
                    ],
                    'WebRoot/dist/javascript/wap/mylongdai-account.min.js': [
                        'WebRoot/src/javascript/wap/mylongdai-account.js'
                    ],
                    'WebRoot/dist/javascript/wap/mylongdai-home.min.js': [
                        'WebRoot/src/javascript/wap/mylongdai-home.js'
                    ],
                    'WebRoot/dist/javascript/wap/mylongdai-news.min.js': [
                        'WebRoot/src/javascript/wap/mylongdai-news.js'
                    ],
                    'WebRoot/dist/javascript/wap/notice-detail.min.js': [
                        'WebRoot/src/javascript/wap/notice-detail.js'
                    ],
                    'WebRoot/dist/javascript/wap/operation-report-2015.min.js': [
                        'WebRoot/src/javascript/lib/jquery/1.7.2/jquery-min.js',
                        'WebRoot/src/javascript/wap/operation-report-2015.js'
                    ],
                    'WebRoot/dist/javascript/wap/promotion.min.js': [
                        'WebRoot/src/javascript/lib/jquery/jquery.onepage-scroll.js',
                        'WebRoot/src/javascript/wap/promotion.js'
                    ],
                    'WebRoot/dist/javascript/wap/recharge-sure.min.js': [
                        'WebRoot/src/javascript/wap/recharge-sure.js'
                    ],
                    'WebRoot/dist/javascript/wap/red-reward-detail.min.js': [
                        'WebRoot/src/javascript/wap/red-reward-detail.js'
                    ],
                    'WebRoot/dist/javascript/wap/red-reward-list.min.js': [
                        'WebRoot/src/javascript/wap/red-reward-list.js'
                    ],
                    'WebRoot/dist/javascript/wap/redbag.min.js': [
                        'WebRoot/src/javascript/wap/redbag.js'
                    ],
                    'WebRoot/dist/javascript/wap/register.min.js': [
                        'WebRoot/src/javascript/wap/register.js'
                    ],
                    'WebRoot/dist/javascript/wap/spring-festivalr.min.js': [
                        'WebRoot/src/javascript/wap/spring-festivalr.js'
                    ],
                    'WebRoot/dist/javascript/wap/debt-sure.min.js': [
                        'WebRoot/src/javascript/wap/debt-sure.js'
                    ],
                    'WebRoot/dist/javascript/wap/debt-detail.min.js': [
                        'WebRoot/src/javascript/wap/debt-detail.js'
                    ],
                    'WebRoot/dist/javascript/wap/transfer-debt-list.min.js': [
                        'WebRoot/src/javascript/wap/transfer-debt-list.js'
                    ],
                    'WebRoot/dist/javascript/wap/turntable.min.js': [
                        'WebRoot/src/javascript/wap/turntable.js'
                    ],
                    'WebRoot/dist/javascript/wap/red-reward-list.min.js': [
                        'WebRoot/src/javascript/wap/red-reward-list.js'
                    ],
                    'WebRoot/dist/javascript/wap/redbag.min.js': [
                        'WebRoot/src/javascript/wap/redbag.js'
                    ],
                    'WebRoot/dist/javascript/wap/spring-festivalr.min.js': [
                        'WebRoot/src/javascript/wap/spring-festivalr.js'
                    ],
                    'WebRoot/dist/javascript/wap/debt.min.js': [
                        'WebRoot/src/javascript/wap/debt.js'
                    ],
                    'WebRoot/dist/javascript/wap/dragon-boat-festival.min.js': [
                        'WebRoot/src/javascript/wap/dragon-boat-festival.js'
                    ]
                }
            }
        },
        uglify: {
            build: {
                src: 'WebRoot/dist/app/core/base.js',
                dest: 'WebRoot/dist/app/core/base.js'
            },
            my_target: {
                files: [
                    {
                        expand: true,
                        cwd: 'WebRoot/src/app',
                        src: '**/*.js',
                        dest: 'WebRoot/dist/app'
                    },
                    {
                        expand: true,
                        cwd: 'WebRoot/dist/javascript',
                        src: '**/*.js',
                        dest: 'WebRoot/dist/javascript'
                    }
                ]
            }
        },
        cssmin: {
            options: {
                //美化代码
                beautify: {
                    ascii_only: true
                }
            },
            target : {
                files: {
                    'WebRoot/dist/app/core/css/base.css': [
                        'WebRoot/src/app/core/css/*.css','WebRoot/src/app/login/css/*.css'
                    ],
                    'WebRoot/dist/cssStyle/base.css': [
                        'WebRoot/src/cssStyle/reset.css',
                        'WebRoot/src/cssStyle/newsCenter.css',
                        'WebRoot/src/cssStyle/main.css',
                        'WebRoot/src/cssStyle/turntable.css',
                        'WebRoot/src/cssStyle/help.css'
                    ],
                    'WebRoot/dist/cssStyle/activityCenter.min.css': [
                        'WebRoot/src/cssStyle/activityCenter.css'
                    ],
                    'WebRoot/dist/cssStyle/ad-page.min.css': [
                        'WebRoot/src/cssStyle/ad-page.css'
                    ],
                    'WebRoot/dist/cssStyle/second-years.min.css': [
                        'WebRoot/src/cssStyle/second-years.css'
                    ],
                    'WebRoot/dist/cssStyle/download-detail.min.css': [
                        'WebRoot/src/cssStyle/promotion.css',
                        'WebRoot/src/cssStyle/annimation.css',
                        'WebRoot/src/cssStyle/onepage-scroll.css'
                    ],
                    'WebRoot/dist/cssStyle/women-day.min.css': [
                        'WebRoot/src/cssStyle/women-day.css'
                    ],
                    'WebRoot/dist/cssStyle/jieqianhua.min.css': [
                        'WebRoot/src/cssStyle/jieqianhua.css'
                    ],
                    'WebRoot/dist/cssStyle/landing-register.min.css': [
                        'WebRoot/src/cssStyle/landing.css',
                        'WebRoot/src/cssStyle/logReg.css'
                    ],
                    'WebRoot/dist/cssStyle/logReg.min.css': [
                        'WebRoot/src/cssStyle/logReg.css'
                    ],
                    'WebRoot/dist/cssStyle/notice.min.css': [
                        'WebRoot/src/cssStyle/notice.css'
                    ],
                    'WebRoot/dist/cssStyle/debt.min.css': [
                        'WebRoot/src/cssStyle/debt.css'
                    ],
                    'WebRoot/dist/cssStyle/spring-festivalr.min.css': [
                        'WebRoot/src/cssStyle/spring-festivalr.css'
                    ],
                    'WebRoot/dist/cssStyle/promotion.min.css': [
                        'WebRoot/src/cssStyle/promotion.css',
                        'WebRoot/src/cssStyle/onepage-scroll.css'
                    ],
                    'WebRoot/dist/cssStyle/redbag.min.css': [
                        'WebRoot/src/cssStyle/redbag.css'
                    ],
                    'WebRoot/dist/cssStyle/red-reward-list.min.css': [
                        'WebRoot/src/cssStyle/red-reward-list.css'
                    ],
                    'WebRoot/dist/cssStyle/dragon-boat-festival.min.css': [
                        'WebRoot/src/cssStyle/dragon-boat-festival.css'
                    ]
                }
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl:'WebRoot/',
                    name : "dist/app/core/boot",
                    optimize: "uglify",
                    mainConfigFile: "WebRoot/src/app/core/boot.js",
                    out: "WebRoot/dist/app/core/boot.js"
                }
            }
        },
        htmlmin:{
            options: {
                removeComments: true,
                removeCommentsFromCDATA: true,
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                removeAttributeQuotes: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeOptionalTags: true
            },
            html: {
                files: [
                    {expand: true, cwd: 'WebRoot/src/app', src: ['**/*.html'], dest: 'WebRoot/dist/app'}
                ]
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: 'WebRoot/src/app',                   // Src matches are relative to this path
                    src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
                    dest: 'WebRoot/dist/app'                  // Destination path prefix
                }]
            }
        },
        copy: {
            main:{
                files : [
                    {
                        src: 'WebRoot/src/main.jsp',
                        dest: 'WebRoot/dist/main.jsp'
                    },
                    {
                        expand: true,
                        cwd: 'WebRoot/src/images/',
                        src: ['**'],
                        dest: 'WebRoot/dist/images/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: 'WebRoot/src/WEB-INF',
                        src: ['**'],
                        dest: 'WebRoot/dist/WEB-INF',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: 'WebRoot/src/include',
                        src: ['**'],
                        dest: 'WebRoot/dist/include',
                        filter: 'isFile'
                    },
                    {
                        src: 'WebRoot/src/404.jsp',
                        dest: 'WebRoot/dist/404.jsp'
                    },
                    {
                        src: 'WebRoot/src/500.jsp',
                        dest: 'WebRoot/dist/500.jsp'
                    },
                    {
                        src: 'WebRoot/src/error.jsp',
                        dest: 'WebRoot/dist/error.jsp'
                    },
                    {
                        src: 'WebRoot/src/error.html',
                        dest: 'WebRoot/dist/error.html'
                    },
                    {
                        src: 'WebRoot/src/weihui.jsp',
                        dest: 'WebRoot/dist/weihui.jsp'
                    }
                ]
            },
            forOld:{
                files : [
                    {
                        expand: true,
                        cwd: 'WebRoot/dist/images/',
                        src: ['**'],
                        dest: 'WebRoot/images/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: 'WebRoot/dist/WEB-INF/',
                        src: ['**'],
                        dest: 'WebRoot/WEB-INF/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: 'WebRoot/dist/include/',
                        src: ['**'],
                        dest: 'WebRoot/include/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: 'WebRoot/dist/cssStyle/',
                        src: ['**'],
                        dest: 'WebRoot/cssStyle/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: 'WebRoot/dist/javascript/',
                        src: ['**'],
                        dest: 'WebRoot/javascript/',
                        filter: 'isFile'
                    },
                    {
                        src: 'WebRoot/dist/404.jsp',
                        dest: 'WebRoot/404.jsp'
                    },
                    {
                        src: 'WebRoot/dist/500.jsp',
                        dest: 'WebRoot/500.jsp'
                    },
                    {
                        src: 'WebRoot/dist/error.jsp',
                        dest: 'WebRoot/error.jsp'
                    },
                    {
                        src: 'WebRoot/dist/error.html',
                        dest: 'WebRoot/error.html'
                    },
                    {
                        src: 'WebRoot/dist/weihui.jsp',
                        dest: 'WebRoot/weihui.jsp'
                    }
                ]
            }
        },
        filerev: {
            options: {
                algorithm: 'md5',
                    length: 8,
                    //这里处理文件名字生成规则
                    process: function(basename, name, extension) {
                    if(
                        basename == "qrcode_for_gh_73c0ad6a5e4c_258"
                    ) {
                        return basename+"."+extension;
                    }
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
                        'WebRoot/dist/**/*.{jpg,jpeg,gif,png}',
                        'WebRoot/dist/**/*.css',
                        'WebRoot/dist/**/*.js'
                    ]
                }]
            }
        },
        usemin: {
            options: {
                //上级目录可以 使用app/cdn/scripts 失败
                assetsDirs: ['WebRoot/'],
                patterns: {
                    jsp: [
                        [/<script.+src=['"]([^"']+)["']/gm,'replace js define use',
                            function (m) {
                                return m.match(/\.js$/) ? m : m + '.js';
                            },
                            function (m) {
                                return m.replace('/dist/javascript', '/javascript');
                            }
                        ],
                        [
                            /<link[^\>]+href=['"]([^"']+)["']/gm, 'Update the HTML with the new css filenames',
                            function (m) {
                                return m.match(/\.css$/) ? m : m + '.css';
                            },
                            function (m) {
                                return m.replace('/dist/cssStyle', '/cssStyle');
                            }
                        ],
                        [
                            /<img[^\>]*[^\>\S]+src=['"]([^'"\)#]+)(#.+)?["']/gm, 'Update the HTML with the new img filenames',
                            function (m) {
                                return m.match(/\.png$/) ? m : m;
                            },
                            function (m) {
                                return m.replace('/dist/images', '/images');
                            }
                        ],
                        //匹配src之前不带空格的不规范写法
                        [
                            /<img[^\>]*[^\>\s]+src=['"]([^'"\)#]+)(#.+)?["']/gm, 'Update the HTML with the new img filenames',
                            function (m) {
                                return m.match(/\.png$/) ? m : m;
                            },
                            function (m) {
                                return m.replace('/dist/images', '/images');
                            }
                        ],
                        [
                            /<img[^>]*[^>\S]+src=['"]([^'"\)#]+)(#.+)?["']/gm, 'Update the HTML with the new img filenames',
                            function (m) {
                                return m.match(/\.png$/) ? m : m;
                            },
                            function (m) {
                                return m.replace('/dist/images', '/images');
                            }
                        ],
                        //匹配src之前不带空格的不规范写法
                        [
                            /<img[^>]*[^>\s]+src=['"]([^'"\)#]+)(#.+)?["']/gm, 'Update the HTML with the new img filenames',
                            function (m) {
                                return m.match(/\.png$/) ? m : m;
                            },
                            function (m) {
                                return m.replace('/dist/images', '/images');
                            }
                        ],
                        [
                            /<img[^\>]*[^\>\S]+src=['"]([^'"\)#]+)(#.+)?["']/gm, 'Update the HTML with the new img filenames',
                            function (m) {
                                return m.match(/\.jpg$/) ? m : m;
                            },
                            function (m) {
                                return m.replace('/dist/images', '/images');
                            }
                        ],
                        //匹配src之前不带空格的不规范写法
                        [
                            /<img[^\>]*[^\>\s]+src=['"]([^'"\)#]+)(#.+)?["']/gm, 'Update the HTML with the new img filenames',
                            function (m) {
                                return m.match(/\.jpg$/) ? m : m;
                            },
                            function (m) {
                                return m.replace('/dist/images', '/images');
                            }
                        ],
                        [
                            /<img[^>]*[^>\S]+src=['"]([^'"\)#]+)(#.+)?["']/gm, 'Update the HTML with the new img filenames',
                            function (m) {
                                return m.match(/\.jpg$/) ? m : m;
                            },
                            function (m) {
                                return m.replace('/dist/images', '/images');
                            }
                        ],
                        //匹配src之前不带空格的不规范写法
                        [
                            /<img[^>]*[^>\s]+src=['"]([^'"\)#]+)(#.+)?["']/gm, 'Update the HTML with the new img filenames',
                            function (m) {
                                return m.match(/\.jpg$/) ? m : m;
                            },
                            function (m) {
                                return m.replace('/dist/images', '/images');
                            }
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
                            /<a[^\>]+href=['"]([^"']+)["']/gm, 'Update the HTML with anchors images',
                            function (m) {
                                return m.match(/\.png$/) ? m : m;
                            },
                            function (m) {
                                return m.replace('/dist/images', '/images');
                            }
                        ],
                        [
                            /<a[^\>]+href=['"]([^"']+)["']/gm, 'Update the HTML with anchors images',
                            function (m) {
                                return m.match(/\.png/) ? m : m;
                            },
                            function (m) {
                                return m.replace('/dist/images', '/images');
                            }
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
                        ]
                    ],
                    html: [
                        [/seajs\.use\(['"]([^"']+)["']\)/gm,'replace html seajs use',
                            function (m) {
                                return m.match(/\.js$/) ? m : m + '.js';
                            },
                            function (m) {
                                return m.replace('.js', '');
                            }
                        ],
                        [
                            /<img[^\>]*[^\>\S]+src=['"]([^'"\)#]+)(#.+)?["']/gm, 'Update the HTML with the new img filenames',
                            function (m) {
                                return m.match(/\.png$/) ? m : m;
                            },
                            function (m) {
                                return m.replace('/dist/images', '/images');
                            }
                        ],
                        //匹配src之前不带空格的不规范写法
                        [
                            /<img[^\>]*[^\>\s]+src=['"]([^'"\)#]+)(#.+)?["']/gm, 'Update the HTML with the new img filenames',
                            function (m) {
                                return m.match(/\.png$/) ? m : m;
                            },
                            function (m) {
                                return m.replace('/dist/images', '/images');
                            }
                        ],
                        [
                            /<img[^>]*[^>\S]+src=['"]([^'"\)#]+)(#.+)?["']/gm, 'Update the HTML with the new img filenames',
                            function (m) {
                                return m.match(/\.png$/) ? m : m;
                            },
                            function (m) {
                                return m.replace('/dist/images', '/images');
                            }
                        ],
                        //匹配src之前不带空格的不规范写法
                        [
                            /<img[^>]*[^>\s]+src=['"]([^'"\)#]+)(#.+)?["']/gm, 'Update the HTML with the new img filenames',
                            function (m) {
                                return m.match(/\.png$/) ? m : m;
                            },
                            function (m) {
                                return m.replace('/dist/images', '/images');
                            }
                        ],
                        [
                            /<img[^\>]*[^\>\S]+src=['"]([^'"\)#]+)(#.+)?["']/gm, 'Update the HTML with the new img filenames',
                            function (m) {
                                return m.match(/\.jpg$/) ? m : m;
                            },
                            function (m) {
                                return m.replace('/dist/images', '/images');
                            }
                        ],
                        //匹配src之前不带空格的不规范写法
                        [
                            /<img[^\>]*[^\>\s]+src=['"]([^'"\)#]+)(#.+)?["']/gm, 'Update the HTML with the new img filenames',
                            function (m) {
                                return m.match(/\.jpg$/) ? m : m;
                            },
                            function (m) {
                                return m.replace('/dist/images', '/images');
                            }
                        ],
                        [
                            /<img[^>]*[^>\S]+src=['"]([^'"\)#]+)(#.+)?["']/gm, 'Update the HTML with the new img filenames',
                            function (m) {
                                return m.match(/\.jpg$/) ? m : m;
                            },
                            function (m) {
                                return m.replace('/dist/images', '/images');
                            }
                        ],
                        //匹配src之前不带空格的不规范写法
                        [
                            /<img[^>]*[^>\s]+src=['"]([^'"\)#]+)(#.+)?["']/gm, 'Update the HTML with the new img filenames',
                            function (m) {
                                return m.match(/\.jpg$/) ? m : m;
                            },
                            function (m) {
                                return m.replace('/dist/images', '/images');
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
                        [/define\(\[['"]([^"']+)['"]/gm,'replace js define use',
                            function (m) {
                                return m.match(/\.js$/) ? m : m + '.js';
                            },
                            function (m) {
                                return m.replace('.js', '');
                            }
                        ],
                        [/requireJS\(\[['"]([^"']+)['"]/gm,'replace js define use',
                            function (m) {
                                return m.match(/\.js$/) ? m : m + '.js';
                            }
                        ],
                        [/requireJS\(\[\s*['"]([^"']+)['"]/gm,'replace js define use',
                            function (m) {
                                return m.match(/\.js$/) ? m : m + '.js';
                            }
                        ],
                        [/deps\:\s\[['"]([^"']+)['"]/gm,'replace js define use',
                            function (m) {
                                return m.match(/\.js$/) ? m : m + '.js';
                            }
                        ],
                        [/deps\:\s\[\s*['"]([^"']+)['"]/gm,'replace js define use',
                            function (m) {
                                return m.match(/\.js$/) ? m : m + '.js';
                            }
                        ],
                        [/deps\:\[['"]([^"']+)['"]/gm,'replace js define use',
                            function (m) {
                                return m.match(/\.js$/) ? m : m + '.js';
                            }
                        ],
                        [/deps\:\[\s*['"]([^"']+)['"]/gm,'replace js define use',
                            function (m) {
                                return m.match(/\.js$/) ? m : m + '.js';
                            }
                        ],
                        [
                            /<img[^\>]*[^\>\S]+src=['"]([^'"\)#]+)(#.+)?["']/gm, 'Update the HTML with the new img filenames',
                                function (m) {
                                    return m.match(/\.png$/) ? m : m;
                                },
                                function (m) {
                                    return m.replace('/dist/images', '/images');
                                }
                            ],
                        //匹配src之前不带空格的不规范写法
                        [
                            /<img[^\>]*[^\>\s]+src=['"]([^'"\)#]+)(#.+)?["']/gm, 'Update the HTML with the new img filenames',
                            function (m) {
                                return m.match(/\.png$/) ? m : m;
                            },
                            function (m) {
                                return m.replace('/dist/images', '/images');
                            }
                        ],
                        [
                            /<img[^>]*[^>\S]+src=['"]([^'"\)#]+)(#.+)?["']/gm, 'Update the HTML with the new img filenames',
                            function (m) {
                                return m.match(/\.png$/) ? m : m;
                            },
                            function (m) {
                                return m.replace('/dist/images', '/images');
                            }
                        ],
                        //匹配src之前不带空格的不规范写法
                        [
                            /<img[^>]*[^>\s]+src=['"]([^'"\)#]+)(#.+)?["']/gm, 'Update the HTML with the new img filenames',
                            function (m) {
                                return m.match(/\.png$/) ? m : m;
                            },
                            function (m) {
                                return m.replace('/dist/images', '/images');
                            }
                        ],
                        [
                            /<img[^\>]*[^\>\S]+src=['"]([^'"\)#]+)(#.+)?["']/gm, 'Update the HTML with the new img filenames',
                            function (m) {
                                return m.match(/\.jpg$/) ? m : m;
                            },
                            function (m) {
                                return m.replace('/dist/images', '/images');
                            }
                        ],
                        //匹配src之前不带空格的不规范写法
                        [
                            /<img[^\>]*[^\>\s]+src=['"]([^'"\)#]+)(#.+)?["']/gm, 'Update the HTML with the new img filenames',
                            function (m) {
                                return m.match(/\.jpg$/) ? m : m;
                            },
                            function (m) {
                                return m.replace('/dist/images', '/images');
                            }
                        ],
                        [
                            /<img[^>]*[^>\S]+src=['"]([^'"\)#]+)(#.+)?["']/gm, 'Update the HTML with the new img filenames',
                            function (m) {
                                return m.match(/\.jpg$/) ? m : m;
                            },
                            function (m) {
                                return m.replace('/dist/images', '/images');
                            }
                        ],
                        //匹配src之前不带空格的不规范写法
                        [
                            /<img[^>]*[^>\s]+src=['"]([^'"\)#]+)(#.+)?["']/gm, 'Update the HTML with the new img filenames',
                            function (m) {
                                return m.match(/\.jpg$/) ? m : m;
                            },
                            function (m) {
                                return m.replace('/dist/images', '/images');
                            }
                        ],
                        [
                            /<a[^\>]+href=['"]([^"']+)["']/gm, 'Update the HTML with anchors images',
                            function (m) {
                                return m.match(/\.png$/) ? m : m;
                            },
                            function (m) {
                                return m.replace('/dist/images', '/images');
                            }
                        ],
                        [
                            /<a[^\>]+href=['"]([^"']+)["']/gm, 'Update the HTML with anchors images',
                            function (m) {
                                return m.match(/\.png/) ? m : m;
                            },
                            function (m) {
                                return m.replace('/dist/images', '/images');
                            }
                        ]
                    ]
                }
            },
            html: 'WebRoot/dist/**/*.html',
            css: 'WebRoot/dist/**/*.css',
            js: 'WebRoot/dist/**/*.js',
            jsp: 'WebRoot/dist/**/*.jsp'
        },
        //清除目录
        clean: {
            all: ['WebRoot/dist/**/*.*','WebRoot/images/','WebRoot/cssStyle/','WebRoot/javascript/','WebRoot/include/','WebRoot/WEB-INF/','WebRoot/404.jsp','WebRoot/500.jsp','WebRoot/error.jsp','WebRoot/error.html','WebRoot/weihui.jsp'],
            cleanDist : ['WebRoot/dist/images/','WebRoot/dist/cssStyle/','WebRoot/dist/javascript/','WebRoot/dist/include/','WebRoot/dist/WEB-INF/','WebRoot/404.jsp','WebRoot/dist/500.jsp','WebRoot/dist/error.jsp','WebRoot/dist/error.html','WebRoot/dist/weihui.jsp']
        }

    });

    // 加载包含 "concat" 任务的插件。合并js文件
    grunt.loadNpmTasks('grunt-contrib-concat');

    // 加载包含 "uglify" 任务的插件。压缩js代码
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // 加载包含 "cssmin" 任务的插件。压缩css代码
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // 加载包含 "requirejs" 任务的插件。
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    //
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-filerev');
    // 默认被执行的任务列表。
    grunt.registerTask('default', ['clean:all','concat','uglify','cssmin','requirejs','htmlmin','imagemin','copy:main','filerev','usemin','copy:forOld','clean:cleanDist']);

};




