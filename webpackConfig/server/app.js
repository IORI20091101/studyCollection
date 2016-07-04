let http = require('http');
let util = require("util");
let path = require('path');

let koa = require('koa');
let router = require("koa-router")();
let serve = require('koa-static');
let open = require('open');


let pkg = require('../package.json');
let env = process.argv[2] || process.env.NODE_ENV;

let debug  = 'production' !== env;

let staticDir = path.resolve(__dirname, '../public/dist');

var routes = require('./routes');

let app = koa();


app.keys = [pkg.name, pkg.description];

app.proxy = true;


// global events listen
app.on('error', (err, ctx) => {
    err.url = err.url || ctx.request.url
    console.error(err, ctx)
})

// handle favicon.ico
app.use(function*(next) {
    if (this.url.match(/favicon\.ico$/)) this.body = ''
    yield next
})

// logger
app.use(function*(next) {
    console.log(this.method.info, this.url)
    yield next
})


routes(router, app, staticDir)
app.use(router.routes());



app.use(serve(staticDir, {
    maxage: 0
}));

app = http.createServer(app.callback());

app.listen(pkg.localServer.port, '127.0.0.1', ()=>{
    "use strict";
    let url = util.format('http://%s:%d', 'localhost', pkg.localServer.port);
    
    console.log('listening at %s', url);
    
    open(url);
})