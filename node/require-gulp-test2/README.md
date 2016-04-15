#gulp require.js 应用开发配置
##该项目使用require-gulp 进行构建，无问题，只要路径配对了都可以满足需求
##服务器目录设置需要与requirejs配置的保持一致这样就不会有问题##


##注意以下几点即可，可参阅[require-grunt-signle](https://github.com/IORI20091101/studyCollection/tree/master/node/require-grunt-signle)
* seajs中transport会自动解析成正确的路径不需要考虑 默认顶级目录##
* r.js 和 config两边的配置要保持一致。##
* 服务器目录设置需要与requirejs配置的保持一致这样就不会有问题##
* 现在的问题主要路径的问题，通过修改路径 全部得到解决require中的路径前不要加./ ../ / 类似的路径所有解析都是相对于basrUrl  将basrUrl设置成/ 其他都相对于此路径 scripts/router类似这样都可以取到
* 将文件的baseUrl设置成顶级目录/ 不要使用相对路径进行引用 这样的改成md5名字后才能将所有引用正确更改

* require必须 使用自带的r.js来合并。
* requirejs有点复杂，一般来说引用是相对于baseUrl来说的，比如/scripts/,但是文件里面引用就变成了concat/router类似这样，但是这样的不能通过查找来替换，需要写顶级标示/scripts/concat/router这样插件才能找到并替换名字，才能正常显示，也就是说，这里配置baseUrl需要为/ 顶级，然后文件的引用相对于这个来引用

* define(['backbone','jquery','core/router']          不会被更改名字 define(['backbone','jquery','/scripts/core/router'] 会被更改名字 这种是顶级标示

* 如果使用了这种方式config中baseUrl 我开始的时候使用了/static/script/  nodejs配置静态文件/static/对应了app.js中设置的/public， 但是导致了在 gulpfile.js使用r.js优化 require.js加载的文件时报错，具体原因是html页面中使用的启动文件是/static/test.js文件 在该文件中又加载config.js这个配置文件但是需要注意的是启动文件和config.js







