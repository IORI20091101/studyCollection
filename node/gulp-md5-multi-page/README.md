#gulp require.js 应用开发配置

使用gulp 对使用requirejs 的文件进行打包压缩，更改文件名成为md5值等等操作

*require.js在实际应用中分两种情况*
*   第一种开发单页面应用。使用data-main 加载。
*   第二种多页面协助开发，公共的require.js的config

**两种情况的代码分别如下**

    <script data-main="js/app.js" src="js/require.js"></script>

    <script src="scripts/require.js"></script>
    <script>
    require(['scripts/config'], function() {
        // Configuration loaded now, safe to do other require calls
        // that depend on that config.
        require(['foo'], function(foo) {

        });
    });
    </script>


##针对以上两种情况分别说明

**多页面应用**
这种情况首先需要单独引入require.js 其次，需要公共的配置文件每次加载页面的时候在 html 页面引入配置文件例如config.js 然后在回调里面使用再加载具体业务逻辑代码，具体查看gulp-md5-multi-page项目

比较纠结的地方
* 如果使用了这种方式config中baseUrl 我开始的时候使用了/static/script/  nodejs配置静态文件/static/对应了app.js中设置的/public， 但是导致了在 gulpfile.js使用r.js优化 require.js加载的文件时报错，具体原因是html页面中使用的启动文件是/static/test.js文件 在该文件中又加载config.js这个配置文件但是需要注意的是启动文件和config.js 记载的时候都没有加载到配置文件，只能写全路径/static/scripts/test.js类似这样 r.js优化的过程用使用跟public相同的config 两遍需要统一
**还没有完全解决打包的问题**
第三方的js文件可以放到scripts的libs文件夹下，专业做法还是放到vendor文件夹下这里也改下


