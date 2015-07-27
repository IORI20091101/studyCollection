module.exports = function (grunt){
    // config path info
    var css_build_src_path = "app/public/styles/",

        css_build_target_path = "app/cdn/styles/",

        js_vendor_src_path = "app/public/vendor",
        js_vendor_target_path = "app/cdn/vendor",

        js_build_src_path = "app/public/scripts/",

        js_transport_target_path = "app/tmp/transport_js/",
        js_concat_target_path = "app/tmp/concat_js/",

        js_build_target_path = "app/cdn/scripts/";
    // config task
    var transport_full_config = {
            options : {
                paths: ["app/cdn"],
                debug : false, //disable output debug file
                alias : {
                    "jquery" : "/vendor/jquery.js"
                }
            },
            // target
            js : {
                options : {
                    idleading : "gozap/"
                },
                files : [
                    {
                        expand : true, // visit {{http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically}} for more information
                        cwd : js_build_src_path, // change work directory
                        src : ["*.js", "*/*.js"], // cmd source file
                        dest : js_transport_target_path // transport cmd module to this directory
                    }
                ]
            }
        },
        copy_full_config = {
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
        concat_full_config = {
            options : {
                paths : ["."],
                include : "relative" // visit {{http://blog.csdn.net/kyfxbl/article/details/15502005}} to get more information
            },
            // target
            js : {
                files:{
                    'app/cdn/scripts/index.js':['app/tmp/transport_js/a.js','app/tmp/transport_js/b.js','app/tmp/transport_js/c.js','app/tmp/transport_js/index.js']
                }
                //files : [
                    //{
                        // : true,
                        //cwd : js_transport_target_path,
                        //src : ["*.js", "*/*.js"],
                        //dest : js_concat_target_path,
                        //ext : ".js"
                    //}
                //]
            }
        },
        sass_full_config = {
            options : {
                style : "compressed"
            },
            dist : {
                files : [{
                    expand : true,
                    cwd : css_build_src_path,
                    src : ["*.scss", "*.sass", "*/*.scss", "*/*.sass"],
                    dest : css_build_target_path,
                    ext : ".css"
                }]
            }
        },
        uglify_full_config = {
            options: {
              mangle: false
            },
            js : {
                files : [
                    {
                        expand : true,
                        cwd : js_concat_target_path,
                        src : ["*.js", "*/*.js"],
                        dest : js_build_target_path,
                        ext : ".js"
                    }
                ]
            },
            vendor: {
                files : [
                    {
                        expand : true,
                        cwd : js_vendor_src_path,
                        src : ["*.js", "*/*.js"],
                        dest : js_vendor_target_path,
                        ext : ".js"
                    }
                ]
            }
        },
        clean_full_config = {
            js : ["app/tmp", "app/cdn"],
            css : ["app/tmp"]
        },
        jshint_full_config = {
            options: {
                // load config from .jshintrc, to get more config info please visit {{https://github.com/mytcer/jshint-docs-cn}}
                jshintrc : ".jshintrc"
            },
            all : [
                "app/cdn/scripts/*.js",
                "app/cdn/scripts/*/*.js"
            ]
        },
        watch_full_config = {
            sass : {
                files : ["app/public/styles/*.scss", "app/styles/*.sass", "app/styles/*/*.scss", "app/styles/*/*.sass"],
                tasks : ["sass"],
                options : {
                    spawn : false // set this value false, so we can automatically set task config when grunt trigger event, {{http://stackoverflow.com/questions/16836076/how-to-uglify-only-changed-file-with-grunt-js-watch-task-if-dynamic-expansion-in}}
                }
            },
            js : {
                files : ["app/public/scripts/*.js", "app/public/scripts/*/*.js"],
                tasks : ['transport', 'concat', 'uglify'],
                options : {
                    spawn : false
                }
            }
        };


    var is_type = function (type){
        return function (obj){
            return Object.prototype.toString.call(obj) === "[object " + type + "]";
        }
    }
    var is_string = is_type("String");


    // Replacing all occurrences of a string{{http://stackoverflow.com/questions/1144783/replacing-all-occurrences-of-a-string-in-javascript}}
    var escapeRegExp = function(string) {
        return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    }
     var replaceAll = function(find, replace, str) {
        return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
    }

    var get_target_file_info = function (src_path, step){
        if(!is_string(src_path)){
            throw new Error("src_path value shoud be string");
        }
        var split_ext,
            ext,
            target_path,
            path,
            real_path;
        split_ext = src_path.split(".");
        // on windows, replace all backslash to forward slash
        src_path = replaceAll("\\", "/", src_path);
        switch(split_ext[(split_ext.length - 1)]){
            case "sass":
            case "scss":
                // replace path and ext
                path = src_path.replace(css_build_src_path, css_build_target_path);
                ext = path.split(".").pop();
                switch(ext){
                    case "scss":
                        real_path = path.replace(/scss$/, "css");
                        break;
                    case "sass":
                        real_path = path.replace(/sass$/, "css");
                        break;
                    default :
                        throw new Error("unavailable style file type");
                }
                break;
            case "js":
                switch(step){
                    case "transport":
                        real_path = src_path.replace(js_build_src_path, js_transport_target_path);
                        break;
                    case "concat":
                        real_path = src_path.replace(js_transport_target_path, js_concat_target_path);
                        break;
                    case "uglify":
                        real_path = src_path.replace(js_concat_target_path, js_build_target_path);
                        break;
                    default :
                        throw new Error("unavailable js build step");
                }
                break;
            default :
                throw new Error("unavailable file type");

        }
        return real_path;
    }
    grunt.initConfig({
        // load config from package.json
        // pkg : grunt.file.readJSON("package.json"),
        transport : transport_full_config,
        // concatenate cmd file
        concat : concat_full_config,
        // compile scss || sass to css
        sass : sass_full_config,
        // minify files
        uglify : uglify_full_config,
        // clean file and folders
        clean : clean_full_config,
        // jshint, check js code quality
        jshint : jshint_full_config,
        // run task when file changed
        watch : watch_full_config,

        copy: copy_full_config
    });

    // small && smart
    grunt.event.on("watch", function (action, filepath, target){
        var file_name = filepath.match(/[^\\/]+\.[^\\/]+$/)[0],
            transport_config,
            transport_path,
            concat_path,
            uglify_path,
            sass_config = {},
            concat_config = {},
            uglify_config = {};

        // update config
        switch (target){
            case "sass":
                sass_config[get_target_file_info(filepath)] = filepath;
                grunt.config("sass.dist.files", sass_config);
                break;
            case "js":
                transport_config = [
                    {
                        expand : true,
                        cwd : js_build_src_path,
                        src : [file_name],
                        dest : js_transport_target_path
                    }
                ]

                transport_path = get_target_file_info(filepath, "transport");
                concat_path = get_target_file_info(transport_path, "concat");
                uglify_path = get_target_file_info(concat_path, "uglify");

                transport_full_config.js.files = transport_config;
                grunt.config("transport", transport_full_config);

                concat_config[concat_path] = transport_path;
                concat_full_config.js.files = concat_config;
                grunt.config("concat", concat_full_config);

                uglify_config[uglify_path] = concat_path;
                uglify_full_config.js.files = uglify_config;
                grunt.config("uglify", uglify_full_config);

                break;
            default :
                return;
        }
    });

    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-cmd-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['clean:js','copy','uglify:vendor', 'transport', 'concat', 'uglify:js']);
    grunt.registerTask('css_build', ['clean:css', 'sass']);
    grunt.registerTask('js_hint', ['jshint']);
    grunt.registerTask('css_watch', ['watch:sass']);
    grunt.registerTask('js_watch', ['watch:js']);
};
