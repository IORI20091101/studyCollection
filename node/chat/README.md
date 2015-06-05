#html&css
* HTML5 Boilerplate
* bootstraphtml模版和css模版
* UI库http://www.bootcss.com/p/flat-ui/
* less

#css技术


#前端技术
* 加载器使用requirejs，
* 前端mvc框架 angularjs,模版如果使用则用handlebars／juicer
* js类库，jquery，underscore 工具库，

#后台开发
*  nodejs
*  后台框架使用express
*  页面使用jade模版  http://html2jade.org/ 将html转成jade

#数据库
* 数据库使用mysql，redies

#打包部署
* grunt 打包部署压缩js和css

#实时长连接 聊天系统需要使用socket.io

#可能用到的其他技术
* pjax
* Swiper移动端触摸滑动插件
* CreateJS库为HTML5游戏开发的引擎


*****

#调研需要使用东西的心得

###研究了下Boilerplate 和bootstrap，前者主要用来提供一套通用的html模板，normalize.css提供了通用的样式，这些在bootstrap中应该也给出了，而且使用了Modernizr来做浏览器特性检测，模板和这方面更加专业严谨同时Modernizr内部使用了yepnope.js来做资源加载器可以加载css和js，满足基本需求还可以但是毕竟小众在实际环境中需要添加一些时间戳版本号之类的高级功能就相形见绌了，所以这里不适用。所以我决定使用bootstrap，同时模板稍作更改将Boilerplate的优点利用起来，Modernizr待定可以引进来，以后如果需要单独进行开发再说。
##这里罗列一下需要复习和学习的东西
* seajs研究下这个加载器，以及在实际应用和配置
* Html5的标签需要用起来，再看下
* Modernizr关于html5和css3针对IE的进行的各种跨浏览器兼容脚本。需要了解
* canvas和svg关于动画方面可以稍微深入。
* jquery&underscore源码的了解
