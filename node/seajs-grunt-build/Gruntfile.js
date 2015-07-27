module.exports = function(grunt){
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
                         'app/.minify/scripts/index.js' : [ build+'scripts/c.js', build+'scripts/b.js',build+'scripts/a.js',build+'scripts/index.js']  // 合并.build/application.js文件到dist/application.js中
                    }
               }
          },
          uglify : {
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
               }
          },
          filerev: {
               options: {
                    algorithm: 'md5',
                    length: 8
               },
               assets: {
                    files: [{
                       src: [
                         'app/cdn/images/**/*.{jpg,jpeg,gif,png}',
                         'fonts/**/*.{eot,svg,ttf,woff}',
                         'app/cdn/scripts/*.js'
                       ]
                    }]
               }
          },
          useminPrepare: {
            html: 'app/cdn/views/index.html',
            options: {
              dest: 'app/cdn',
              root: '.'
            }
          },

          usemin: {
               options: {
                    //上级目录可以 使用app/cdn/scripts 失败
                    assetsDirs: ['app/cdn/']
               },
               html: 'app/cdn/views/index.html'
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

     grunt.registerTask('default',['clean','transport','concat','uglify','copy','filerev','usemin'])
};