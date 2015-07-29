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
     var source = "app/public/",
     //js transport 目录
         build = "app/.build/",
     //js minify目录
          minify = "app/.minify/",

     //js最终目录
          cdn ="app/cdn/";

     grunt.initConfig({
          transport : {
               options : {
                    paths: ["app/public"],
                    debug : false, //disable output debug file
                    alias : {
                         "jquery" : "/vendor/jquery.js"
                    },
                    //id与路径一定要相符合 否则加载不到
                    idleading: '/scripts/'
               },
               application : {
                    files: [{
                         expand:true,
                         cwd: 'app/public/scripts',
                         src: '**/*.js',
                         dest: 'app/.build/scripts'
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
                          'app/.minify/scripts/index.js' : [
                            build+'scripts/c.js',
                            build+'scripts/b.js',
                            build+'scripts/a.js',
                            build+'scripts/index.js'
                          ],
                          'app/.minify/scripts/router.js':[
                            build+'scripts/core/router.js',
                            build+'scripts/router.js',
                          ],
                          'app/.minify/scripts/concat/router.js':[
                            build+'scripts/concat/router.js',
                            build+'scripts/concat/tmpl/tmpl.js',
                            build+'scripts/concat/view/view.js',
                          ],
                          'app/.minify/scripts/sms/router.js':[
                            build+'scripts/sms/router.js',
                            build+'scripts/sms/tmpl/tmpl.js',
                            build+'scripts/sms/view/view.js',
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
                         cwd: 'app/.minify/scripts',
                         src: '**/*.js',
                         dest:'app/cdn/scripts'
                     }]
              },
              vendor: {
                    files : [
                         {
                             expand : true,
                             cwd : "app/public/vendor",
                             src : ["*.js", "*/*.js"],
                             dest : "app/cdn/vendor",
                             ext : ".js"
                         }
                    ]
              }
          },
          copy :{
               main: {
                    files: [
                       // includes files within path
                         {
                             expand: true,
                             cwd: 'app/public/views/',
                             src: ['**'],
                             dest: 'app/cdn/views',
                             filter: 'isFile'
                         }
                    ]
               }/*,
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
                cwd: 'app/public/styles',
                src: ['*.css', '!*.min.css'],
                dest: 'app/cdn/styles',
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
                         'app/cdn/images/**/*.{jpg,jpeg,gif,png}',
                         'app/cdn/styles/**/*.css',
                         'fonts/**/*.{eot,svg,ttf,woff}',
                         'app/cdn/scripts/**/*.js'
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
                    assetsDirs: ['app/cdn/'],
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
                          ]
                      ]
                    }
               },
               html: 'app/cdn/views/index.html',
               css: 'app/cdn/styles/*.css',
               js: ['app/cdn/scripts/*.js', 'app/cdn/scripts/sms/*.js','app/cdn/scripts/concat/*.js']
          },
          clean : {
               build : [cdn,build,minify] //清除.build文件
          }
     });
     grunt.loadNpmTasks('grunt-cmd-transport');
     grunt.loadNpmTasks('grunt-cmd-concat');
     grunt.loadNpmTasks('grunt-contrib-uglify');
     grunt.loadNpmTasks('grunt-contrib-clean');
     grunt.loadNpmTasks('grunt-contrib-copy');
     grunt.loadNpmTasks('grunt-filerev');
     grunt.loadNpmTasks('grunt-usemin');
     grunt.loadNpmTasks('grunt-contrib-imagemin');
     grunt.loadNpmTasks('grunt-contrib-cssmin');

     grunt.registerTask('default',['clean','transport','concat','uglify','copy','cssmin','imagemin','filerev','usemin'])
};