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
     //js原始目录
     var source = "src/",
     //js transport 目录
         build = ".build/",
     //js minify目录
          minify = ".minify/",

     //js最终目录
          cdn ="cdn/";

    grunt.file.defaultEncoding = 'utf8';


    grunt.initConfig({
          concat : {
               main : {
                    options : {
                        relative : true,
                        noncmd: true
                    },
                    files : {
                      // 合并.build/application.js文件到dist/application.js中
                        '.minify/javascript/core/base.js' : [
                            source+'javascript/lib/json2/json2.js',
                            source+'javascript/lib/jquery/1.7.2/jquery.js',
                            source+'javascript/lib/jquery/jquery.ext.js',
                            source+'javascript/lib/jquery/jquery.ui.widget.js',
                            source+'javascript/lib/jquery/jquery.iframe-transport.js',
                            source+'javascript/lib/jquery/jquery.fileupload.js',
                            source+'javascript/lib/juicer/0.6.1/juicer-min.js',
                            source+'javascript/lib/underscore/1.3.3/underscore-min.js',
                            source+'javascript/lib/cookie/cookie.min.js',
                            source+'javascript/core/core.js',
                            source+'javascript/core/toptips.js',
                            source+'javascript/core/selectBankCard.js',
                            source+'javascript/core/ZeroClipboard.js',
                            source+'javascript/core/share.js',
                            source+'javascript/core/dialog.js',
                            source+'javascript/core/page.js',
                            source+'javascript/core/accounting.js',
                            source+'javascript/core/regex.js',
                            source+'javascript/core/topLogRegister.js'
                        ],
                        '.minify/javascript/ad-page-min.js':[
                            //source+'javascript/core/jquery.qrcode.min.js',
                            source+'javascript/ad-page.js'
                        ],
                        '.minify/javascript/second-years-min.js':[
                            //source+'javascript/core/jquery.qrcode.min.js',
                            source+'javascript/second-years.js'
                        ],
                        '.minify/javascript/rebate-min.js':[
                            //source+'javascript/core/jquery.qrcode.min.js',
                            source+'javascript/rebate.js'
                        ],
                        '.minify/javascript/moonCake-min.js':[
                            //source+'javascript/core/jquery.qrcode.min.js',
                            source+'javascript/moonCake.js'
                        ],
                        '.minify/javascript/goddess-festival-min.js':[
                            //source+'javascript/core/jquery.qrcode.min.js',
                            source+'javascript/goddess-festival.js'
                        ],
                        '.minify/javascript/roulette-min.js':[
                            //source+'javascript/core/jquery.qrcode.min.js',
                            source+'javascript/roulette.js'
                        ],
                        '.minify/javascript/smash-egg-min.js':[
                            //source+'javascript/core/jquery.qrcode.min.js',
                            source+'javascript/smash-egg.js'
                        ],
                        '.minify/javascript/spring-festivalr-min.js':[
                            //source+'javascript/core/jquery.qrcode.min.js',
                            source+'javascript/spring-festivalr.js'
                        ],

                        '.minify/javascript/forget-pwd-min.js':[
                            // source+'javascript/lib/juicer/0.6.1/juicer-min.js',
                            source+'javascript/forget-pwd.js'
                        ],
                        '.minify/javascript/borrow-commit-confirm-min.js':[
                            source+'javascript/fancybox.js',
                            source+'javascript/jbox/jquery.jBox-2.3.min.js',
                            source+'javascript/jbox/jquery.jBox-zh-CN.js',
                            source+'javascript/borrow-commit-confirm.js'
                        ],
                        '.minify/javascript/borrow-step-two-min.js':[
                            source+'javascript/borrow-step-two-tmpl.js',
                            source+'javascript/borrow-step-two.js'
                        ],
                        '.minify/javascript/capitalIndex-min.js':[
                            //source+'javascript/idNoDialog.js',
                            source+'javascript/recharge.js',
                            source+'javascript/commonAjaxJson.js',
                            source+'javascript/withdrawal.js'
                        ],
                        '.minify/javascript/creditor-detail-min.js':[
                            //source+'javascript/idNoDialog.js',
                            source+'javascript/core/bubbles.js',
                            source+'javascript/creditor-detail.js'
                        ],
                        '.minify/javascript/recharge-min.js':[
                            source+'javascript/commonAjaxJson.js',
                            source+'javascript/recharge.js'
                        ],
                        '.minify/javascript/withdrawal-min.js':[
                            source+'javascript/commonAjaxJson.js',
                            ////source+'javascript/idNoDialog.js',
                            source+'javascript/core/bubbles.js',
                            source+'javascript/withdrawal.js'
                        ],
                        '.minify/javascript/finance-invest-min.js':[
                            source+'javascript/finance-tool.js',
                            source+'javascript/core/bubbles.js',
                            source+'javascript/finance-invest.js'
                        ],
                        '.minify/javascript/automaticBid-min.js':[
                            //source+'javascript/idNoDialog.js',
                            source+'javascript/automaticBid.js'
                        ],
                        '.minify/javascript/finance-borrow-detail-min.js':[
                            //source+'javascript/idNoDialog.js',
                            source+'javascript/core/bubbles.js',
                            source+'javascript/finance-borrow-detail-invest.js'
                        ],
                        '.minify/javascript/creditor-pay-confirm-min.js':[
                            source+'javascript/core/bubbles.js',
                            source+'javascript/creditor-pay-confirm.js'
                        ],
                        '.minify/javascript/debt-manager-aucted-min.js':[
                            source+'javascript/core/bubbles.js',
                            source+'javascript/finance-tool.js'
                        ],
                        '.minify/javascript/finance-hold-min.js':[
                            source+'javascript/core/bubbles.js',
                            source+'javascript/finance-hold.js'
                        ],
                        '.minify/javascript/countdown-min.js':[
                            source+'javascript/finance-tool.js',
                            source+'javascript/core/countdown.js'
                        ],
                        '.minify/javascript/finance-index-min.js':[
                            source+'javascript/core/countdown.js',
                            source+'javascript/finance-index.js'
                        ],
                        '.minify/javascript/finance-plan-list-min.js':[
                            source+'javascript/core/countdown.js',
                            source+'javascript/finance-plan-list.js'
                        ],
                        '.minify/javascript/landing-min.js':[
                            source+'javascript/core/countdown.js',
                            source+'javascript/landing.js'
                        ],
                        '.minify/javascript/finance-plan-min.js':[
                            //source+'javascript/idNoDialog.js',
                            source+'javascript/core/bubbles.js',
                            source+'javascript/finance-plan.js'
                        ],
                        '.minify/javascript/security-settings-min.js':[
                            //source+'javascript/idNoDialog.js',
                            source+'javascript/security-settings.js'
                        ],
                        '.minify/javascript/finance-plan-new-min.js':[
                            //source+'javascript/idNoDialog.js',
                            source+'javascript/core/bubbles.js',
                            source+'javascript/finance-plan-new.js'
                        ],
                        '.minify/javascript/home-index-min.js':[
                            source+'javascript/withdrawal.js',
                            source+'javascript/core/bubbles.js',
                            source+'javascript/home-index.js',
                            source+'javascript/idNoDialog.js'
                        ],
                        '.minify/javascript/index-min.js':[
                            // source+'javascript/core/countdown.js',
                            // source+'javascript/core/bubbles.js',
                            source+'javascript/index.js'
                        ],
                        '.minify/javascript/operation-min.js':[
                            source+'javascript/lib/jquery/1.7.2/jquery.js',
                            source+'javascript/operation-report.js'
                        ],
                        '.minify/javascript/operationTF-min.js':[
                            source+'javascript/lib/jquery/1.7.2/jquery.js',
                            source+'javascript/operation-report-2015.js'
                        ],
                        '.minify/javascript/decemberTwelfth-min.js':[
                            // source+'/javascript/core/jquery.qrcode.min.js',
                            source+'/javascript/decemberTwelfth.js'
                        ],
                        '.minify/javascript/dragon-boat-min.js':[
                            // source+'/javascript/core/jquery.qrcode.min.js',
                            source+'/javascript/dragon-boat.js'
                        ],
                        '.minify/javascript/message-min.js':[
                            source+'/javascript/finance-tool.js',
                            source+'/javascript/message.js'
                        ],
                        '.minify/javascript/novice-task-min.js':[
                            //source+'javascript/idNoDialog.js',
                            source+'javascript/novice-task.js'
                        ],
                        '.minify/javascript/real-time-data-min.js':[
                            source+'javascript/core/d3.min.js',
                            source+'javascript/core/d3.tip.js',
                            source+'javascript/real-time-data.js'
                        ]

                    }
               }
          },
          uglify : {
              options:{
                  mangle: false,
                  ASCIIOnly: true,
              },
              minify : {
                  files: [{
                      expand: true,
                      cwd: '.minify/javascript',
                      src: ["*.js", "**/*.js"],
                      dest:'cdn/javascript'
                  }]
              },
              main : {
                    files: [{
                         expand: true,
                         cwd: 'src/javascript',
                         src: "*.js",
                         dest:'cdn/javascript'
                     }]
              },
              lib : {
                  files: [{
                      expand: true,
                      cwd: 'src/javascript/lib',
                      src: ["*.js", "**/*.js"],
                      dest:'cdn/javascript/lib'
                  }]
              },
              core : {
                  files: [{
                      expand: true,
                      cwd: 'src/javascript/core',
                      src: ["*.js", "**/*.js"],
                      dest:'cdn/javascript/core'
                  }]
              }
          },
         //将一些不需要更改的文件只做复制到dist文件夹
          copy :{
              javascript: {
                  files: [
                      {
                          expand: true,
                          cwd: 'src/javascript',
                          src: ['**'],
                          dest: cdn+'javascript',
                          filter: 'isFile'
                      }
                  ]
              },
              images: {
                  files: [
                      {
                          expand: true,
                          cwd: 'src/images/',
                          src: ['**'],
                          dest: cdn+'images',
                          filter: 'isFile'
                      }
                  ]
              },
              css: {
                  files: [
                      {
                          expand: true,
                          cwd: 'src/css/',
                          src: ['**'],
                          dest: cdn+'css',
                          filter: 'isFile'
                      }
                  ]
              },
              script: {
                  files: [
                      {
                          expand: true,
                          cwd: 'src/script/',
                          src: ['**'],
                          dest: cdn+'script',
                          filter: 'isFile'
                      }
                  ]
              },
              common: {
                  files: [
                      {
                          expand: true,
                          cwd: 'src/common/',
                          src: ['**'],
                          dest: cdn+'common',
                          filter: 'isFile'
                      }
                  ]
              },
              doc: {
                  files: [
                      {
                          expand: true,
                          cwd: 'src/doc/',
                          src: ['**'],
                          dest: cdn+'doc',
                          filter: 'isFile'
                      }
                  ]
              },
              include: {
                  files: [
                      // includes files within path
                      {
                          expand: true,
                          cwd: 'src/include/',
                          src: ['**'],
                          dest: cdn+'include',
                          filter: 'isFile'
                      }
                  ]
              },
              kindeditor: {
                  files: [
                      // includes files within path
                      {
                          expand: true,
                          cwd: 'src/kindeditor/',
                          src: ['**'],
                          dest: cdn+'kindeditor',
                          filter: 'isFile'
                      }
                  ]
              },
              layer: {
                  files: [
                      // includes files within path
                      {
                          expand: true,
                          cwd: 'src/layer/',
                          src: ['**'],
                          dest: cdn+'layer',
                          filter: 'isFile'
                      }
                  ]
              },
              meta: {
                  files: [
                      // includes files within path
                      {
                          expand: true,
                          cwd: 'src/META-INF/',
                          src: ['**'],
                          dest: cdn+'META-INF',
                          filter: 'isFile'
                      }
                  ]
              },
              my97Date: {
                  files: [
                      // includes files within path
                      {
                          expand: true,
                          cwd: 'src/My97DatePicker/',
                          src: ['**'],
                          dest: cdn+'My97DatePicker',
                          filter: 'isFile'
                      }
                  ]
              },
              webinf: {
                  files: [
                      // includes files within path
                      {
                          expand: true,
                          cwd: 'src/WEB-INF/',
                          src: ['**'],
                          dest: cdn+'WEB-INF',
                          filter: 'isFile'
                      }
                  ]
              },
              srcfile: {
                  files: [
                      // includes files within path
                      {
                          expand: true,
                          cwd: 'src/',
                          src: ['*.html','*.jsp','*.txt', '*.png','*.ico'],
                          dest: cdn,
                          filter: 'isFile'
                      }
                  ]
              },
              cdn2root:{
                  files: [
                      // includes files within path
                      {
                          expand: true,
                          cwd: 'cdn/',
                          src: ['**'],
                          dest: __dirname,
                          filter: 'isFile'
                      }
                  ]
              }
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
              options: {
                  //美化代码
                  beautify: {
                      ascii_only: true
                  }
              },
              target: {
                  files: [{
                      expand: true,
                      cwd: 'src/cssStyle',
                      src: ['*.css', '!*.min.css'],
                      dest: 'cdn/cssStyle',
                      ext: '.css'
                  }]
              },
            single: {
                files: {
                    'cdn/cssStyle/helpcenterOs-min.css': [source+'cssStyle/personCenter.css',source+'cssStyle/helpcenter-os.css'],
                    'cdn/cssStyle/helpcenter-min.css': [source+'cssStyle/personCenter.css',source+'cssStyle/helpcenter.css'],
                    'cdn/cssStyle/financialmgmt-min.css':[source+'cssStyle/personCenter.css',source+'cssStyle/financialmgmt.css'],
                    'cdn/cssStyle/borrow-step-min.css':[source+'cssStyle/finance-tool.css',source+'cssStyle/borrow-step.css'],
                    'cdn/cssStyle/borrow-index-min.css':[source+'cssStyle/finance-tool.css',source+'cssStyle/borrow-index.css'],
                    'cdn/cssStyle/capitalIndex-min.css':[
                        source+'cssStyle/personCenter.css',
                        source+'cssStyle/assetsmgmt-zly.css',
                        source+'cssStyle/securitySettingsDialog.css'
                    ],
                    'cdn/cssStyle/person-security-min.css':[
                        source+'cssStyle/personCenter.css',
                        source+'cssStyle/securitySettingsDialog.css'
                    ],
                    'cdn/cssStyle/download-min.css':[
                        source+'cssStyle/personCenter.css',
                        source+'cssStyle/helpcenter.css',
                        source+'cssStyle/download.css'
                    ],
                    'cdn/cssStyle/detail-min.css':[
                        source+'cssStyle/finance-tool.css',
                        source+'cssStyle/detail.css'
                    ],
                    'cdn/cssStyle/borrow-index-min.css':[
                        source+'cssStyle/finance-tool.css',
                        source+'cssStyle/borrow-index.css'
                    ],
                    'cdn/cssStyle/landing-min.css':[
                        source+'cssStyle/landing.css',
                        source+'cssStyle/count-down.css'
                    ],
                    'cdn/cssStyle/finance-catalog-min.css':[
                        source+'cssStyle/finance-tool.css',
                        source+'cssStyle/finance-catalog.css'
                    ],
                    'cdn/cssStyle/callus-min.css':[
                        source+ 'cssStyle/personCenter.css',
                        source+'cssStyle/helpcenter.css',
                        source+'cssStyle/callus.css'
                    ],
                    'cdn/cssStyle/finance-borrow-detail-min.css':[
                        source+'cssStyle/detail.css',
                        source+'cssStyle/home.css',
                        source+'cssStyle/progress.css'
                    ],
                    'cdn/cssStyle/notices-min.css':[
                        source+'cssStyle/personCenter.css',
                        source+'cssStyle/helpcenter.css',
                        source+'cssStyle/notices.css'
                    ],
                    'cdn/cssStyle/notices-news-min.css':[
                        source+'cssStyle/personCenter.css',
                        source+'cssStyle/notices.css'
                    ],
                    'cdn/cssStyle/hold-plan-dialog-min.css':[
                        source+'cssStyle/personCenter.css',
                        source+'/cssStyle/hold-plan-dialog.css'
                    ],
                    'cdn/cssStyle/finance-plan-detail-min.css':[
                        source+'cssStyle/detail.css',
                        source+'cssStyle/finance-plan.css',
                        source+'cssStyle/securitySettingsDialog.css',
                        source+'/cssStyle/progress.css'
                    ],
                    'cdn/cssStyle/base.css':[
                        source+'cssStyle/index.css',
                        source+'cssStyle/dialog.css',
                        //source+'cssStyle/jbox/Gray/jbox.css',
                        source+'cssStyle/home.css',
                        source+'cssStyle/fileupload.css'
                    ],
                    'cdn/cssStyle/coupon-min.css':[
                        source+'cssStyle/personCenter.css',
                        source+'cssStyle/coupon.css'
                    ],
                    'cdn/cssStyle/company-min.css':[
                        source+'cssStyle/personCenter.css',
                        source+'cssStyle/helpcenter-os.css',
                        source+'cssStyle/company.css'
                    ]



                }
            }

          },
          htmlmin: {                                     // Task
             dist: {                                      // Target
                 options: {                                 // Target options
                     removeComments: true,
                     collapseWhitespace: true
                 },
                 files: {                                   // Dictionary of files
                     'cdn/404.html': 'cdn/404.html',     // 'destination': 'source'
                     'cdn/404.jsp': 'cdn/404.jsp'
                 }
             }
          },
          imagemin: {                          // Task
            dynamic: {
              options: {
                optimizationLevel: 3 //定义 PNG 图片优化水平
              },                     // Another target
              files: [{
                expand: true,                  // Enable dynamic expansion
                cwd: 'src/images/',                   // Src matches are relative to this path
                src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
                dest: 'cdn/images/'            // Destination path prefix
              }]
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
                         'cdn/images/**/*.{jpg,jpeg,gif,png}',
                         'cdn/cssStyle/**/*.css',
                         'cdn/javascript/*.js',
                         'cdn/javascript/core/*.js',
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
                    assetsDirs: ['cdn/'],
                    patterns: {
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
                            //匹配src之前不带空格的不规范写法
                            [
                                /<img[^\>]*[^\>\s]+src=['"]([^'"\)#]+)(#.+)?["']/gm,
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
                          [
                              /<img[^\>]*[^\>\S]+src=['"]([^'"\)#]+)(#.+)?["']/gm,
                              'Update the HTML with the new img filenames'
                          ],
                      ]
                    }
               },
               html: 'cdn/**/*.html',
               css: 'cdn/cssStyle/*.css',
               js: 'cdn/javascript/*.js',
               jsp: 'cdn/**/*.jsp'
          },
          clean : {
               build : [
                   cdn,build,minify,
                   'common/',
                   'css/',
                   'cssStyle/',
                   'doc/',
                   'images/',
                   'include/',
                   'javascript/',
                   'kindeditor',
                   'layer/',
                   'META-INF/',
                   'My97DatePicker/',
                   'script/',
                   'WEB-INF/',
                   '404.html',
                   '404.jsp',
                   '500.html',
                   '500.jsp',
                   'error.html',
                   'favicon.ico',
                   'index.html',
                   'index.jsp',
                   'info.png',
                   'nagios.jsp',
                   'robots.txt',
                   'weihui.jsp'
               ] //清除.build文件
          }
     });
    // grunt.loadNpmTasks('grunt-cmd-transport');
     grunt.loadNpmTasks('grunt-cmd-concat');
     grunt.loadNpmTasks('grunt-contrib-uglify');
     grunt.loadNpmTasks('grunt-contrib-clean');
     grunt.loadNpmTasks('grunt-contrib-copy');
     grunt.loadNpmTasks('grunt-filerev');
     grunt.loadNpmTasks('grunt-usemin');
     grunt.loadNpmTasks('grunt-contrib-cssmin');
     grunt.loadNpmTasks('grunt-contrib-htmlmin');


    //grunt.registerTask('default',['clean','transport','concat','uglify','copy','cssmin','filerev','usemin'])

    grunt.registerTask('default',['clean',
        'copy:javascript','copy:images','copy:css','copy:script','copy:common',
        'copy:doc','copy:include','copy:kindeditor','copy:layer','copy:webinf',
        'copy:srcfile','copy:my97Date','copy:meta',
        'concat','uglify','cssmin','filerev','usemin','copy:cdn2root']);
};