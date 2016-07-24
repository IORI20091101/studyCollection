/**
 * Created by toshiba on 16/7/23.
 */

var http = require("http");
var util = require("util");
var path = require("path");              // 路径处理的中间件解决不同操作系统的路径问题
var koa = require("koa");                // koa 类似express服务器更高效
var router = require("koa-router")();      // koa 路由
var serveStatic = require("koa-static"); //koa 静态文件托管
var open = require("open");

var staticDir = path.resolve(__dirname, 'public');

let routes = require('./routes');

var app = koa();

app.proxy = true;


var koaBody   = require('koa-body');

app.use(koaBody({formidable:{uploadDir: __dirname}}));

app.on("error", function(err, ctx) {
    err.url = err.url || ctx.request.url;
    console.error(err, ctx);
})



app.use(function*(next) {
    if (this.url.match(/favicon\.ico$/)) this.body = ''
    yield next
});


// logger
app.use(function*(next) {
    console.log(this.method, this.url)
    yield next
});

//app.use(function *(next) {
//    if (this.request.method == 'POST') {
//        console.log(this.request.body);
//        // => POST body
//        this.body = JSON.stringify(this.request.body);
//    }
//    yield next;
//});


routes(router, app, staticDir);

app.use(router.routes());


app.use(serveStatic(staticDir, {
    maxage: 0
}));

app = http.createServer(app.callback());

app.listen(3000, '127.0.0.1', () => {
    "use strict";
    let url = util.format('http://%s:%s', 'localhost',3000);

    console.log('local debug server listening at %s', url);

    open(url);
})