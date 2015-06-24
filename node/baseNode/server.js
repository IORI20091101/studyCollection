var http = require('http');

var colors = require('colors');
console.log("hello world".rainbow);
var server = http.createServer(function(req, res) {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end("<h1>Hello world!</h1>")
});

server.listen(3000);