#针对使用seajs的项目使用grunt进行前端部署

##工具

* [seajs](http://seajs.org/docs/)作为加载器
* [backbone](http://www.css88.com/doc/backbone/)作为前端mvc框架
* [grunt](http://www.gruntjs.net/)进行合并打包压缩部署
    * [grunt-cmd-transport](https://www.npmjs.com/package/grunt-cmd-transport) CMD模块要想正常运行需要transport(添加id和依赖处理成类似define(id,[""], function))
    * [grunt-cmd-concat](https://www.npmjs.com/package/grunt-cmd-concat)  CMD模块进行合并
    * [grunt-contrib-clean](https://www.npmjs.com/package/grunt-contrib-clean)：删除文件清除成的临时文件。
    * [grunt-contrib-uglify](https://www.npmjs.com/package/grunt-contrib-uglify)：压缩以及合并JavaScript文件。
    * [grunt-contrib-copy](https://www.npmjs.com/package/grunt-contrib-copy)：复制文件。
    * [grunt-contrib-cssmin](https://www.npmjs.com/package/grunt-contrib-cssmin)：压缩以及合并CSS文件。
    * [grunt-contrib-imagemin](https://www.npmjs.com/package/grunt-contrib-imagemin)：图像压缩模块。
    * [grunt-filerev](https://www.npmjs.com/package/grunt-filerev) ：将指定的文件命名为MD5类型名字 index.js==> index.73b2d3ad.js
    * [grunt-usemin](https://www.npmjs.com/package/grunt-usemin) : 将被更名的文件的引用进行修改，使得能够被引用到包括css，js ，图片
    * [grunt-contrib-compass](https://www.npmjs.com/package/grunt-contrib-compass)：使用compass编译sass文件。
    * [grunt-contrib-jshint](https://www.npmjs.com/package/grunt-contrib-jshint)：检查JavaScript语法。
    * [grunt-contrib-watch](https://www.npmjs.com/package/grunt-contrib-watch)：监视文件变动，做出相应动作。


##工作流程
    1. 原始目录是app/public下的文件，将所有的js文件通过transport 处理成带有id的文件放到.build文件下
    2. 再将.build下的入口文件，包括router，还有seajs.use,require.async的文件压缩到一个文件中这里需要在Gruntfile.js中进行配置
    3. CDN作为最终路径，将压缩的css和image，html处理到这里，同时将需要的文件名字改成MD5的值同时将所有的引用进行替换，这里的配置需要注意

##注意事项&难点
    1. 打包的入口文件包括，router, 和所有seajs.use 和require.async引用的文件，如果是单页应用在路由中使用require需要是require.async异步引用，这样会根据路由来动态下载所需要的文件，否则直接require会将所有的文件全部下载影响效率。具体在例子中有体现
    2. 通过transport生成的id 必须跟路径能够匹配起来，即完全一样，否则会有加载到不能执行的情况。
    3. 如果加载的时候[相对标识](https://github.com/seajs/seajs/issues/258)可能失效，则需要使用[普通路径](https://github.com/seajs/seajs/issues/258)
    4. usemin中关于更改索引的时候添加了关于seajs的 seajs.use， define, 和require.async的相关规则这里查看了源码花费了很多时间完成 [源码地址](https://github.com/yeoman/grunt-usemin/blob/master/lib/fileprocessor.js)以做参考