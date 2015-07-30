#gulp require.js 应用开发配置，该项目使用require-gulp 进行构建，无问题，只要路径配对了都可以满足需求



由于使用了require以前transport和concat的操作大部分不需要重新配置


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


##requirejs配置注意点
* 使用requirejs最好使用baseUrl指向scripts的目录，其他目录通过../vendor来引用到path这样避免凌乱的配置
* www/
    * index.html
    * js/
        * app/
            * sub.js
        * lib/
            * jquery.js
            * canvas.js
        * app.js
* 一个文件一个模块: 每个Javascript文件应该只定义一个模块，这是模块名-至-文件名查找机制的自然要求。多个模块会被优化工具组织优化，但你在使用优化工具时应将多个模块放置到一个文件中。

* define()中的相对模块名: 为了可以在define()内部使用诸如require("./relative/name")的调用以正确解析相对名称，记得将"require"本身作为一个依赖注入到模块中

* 生成相对于模块的URL地址: 你可能需要生成一个相对于模块的URL地址。你可以将"require"作为一个依赖注入进来，然后调用require.toUrl()以生成该URL:
```javascript
    define(["require"], function(require) {
        var cssUrl = require.toUrl("./style.css");
    });
```
* 关于路径的问题，在scripts/router中设置的路由 /concat根据路径来加载文件时都是相对于 baseUrl这里于seajs不同
seajs需要的是真实的url路径即普通标示

* gulpfile.js中通过r.js优化代码时的配置 baseUrl:'scripts/' ,如果加了'/scripts/' 优化失败，需要注意,相对于appDir

* 入口文件尽量不要通过md5改名字，因为改完名字后，js内部的内容可能不会改变，这样的话，导致路径和id不匹配的情况所以加载的文件也不会执行，由于这里的rev-all插件比较简单，就这样保持入口不变配置就可以， seajs项目中的usemin有详细配置那里我的操作就是讲js中的文件名也通过正则进行匹配更改，这里先这样满足需求即可，**但是有一个问题，如果没有md5文件无法更新。所以应该找seajs那边的操作更改文件中的引用**


seajs 必须transport 再concat ，而且路径无问题

require必须 使用自带的r.js来合并。
requirejs有点复杂，一般来说引用是相对于baseUrl来说的，比如/scripts/,但是文件里面引用就变成了concat/router类似这样，但是这样的不能通过查找来替换，需要写顶级标示/scripts/concat/router这样插件才能找到并替换名字，才能正常显示，也就是说，这里配置baseUrl需要为/ 顶级，然后文件的引用相对于这个来引用

define(['backbone','jquery','core/router']          不会被更改名字
define(['backbone','jquery','/scripts/core/router'] 会被更改名字 这种是顶级标示

现在的问题主要路径的问题，通过修改路径 全部得到解决require中的路径前不要加./ ../ / 类似的路径所有解析都是相对于basrUrl  将basrUrl设置成/ 其他都相对于此路径 scripts/router类似这样都可以取到
**将文件的baseUrl设置成顶级目录/ 不要使用相对路径进行引用 这样的改成md5名字后才能将所有引用正确更改**

##seajs中transport会自动解析成正确的路径不需要考虑 默认顶级目录##

##r.js 和 config两边的配置要保持一致。##

##服务器目录设置需要与requirejs配置的保持一致这样就不会有问题##


