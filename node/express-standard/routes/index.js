var express = require('express');
var router = express.Router();

var myUtil = require("../utils/myUtil");


var Robot = require("../utils/robot");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/bug', function(req, res, next) {
    var saveDir = "/Users/toshiba/Documents/git-workspace/gitHub/studyCollection/node/express-standard/tmp";
    var oOptions = {
        domain:'chouti.com', //抓取网站的域名
        firstUrl:'http://dig.chouti.com/', //抓取的初始URL地址
        saveDir:saveDir, //抓取内容保存目录
        debug:true //是否开启调试模式
    };
    var o = new Robot(oOptions);
    o.crawl(); //开始抓取
});
router.get('/bug1', function(req, res, next) {
    var url = "http://movie.douban.com/subject/11529526";

    console.log(url);
    myUtil.get(url, function(content, status) {
        console.log("status:=" + status);
        res.send(content);
    });
});
module.exports = router;
