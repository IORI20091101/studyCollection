module.exports = require('http').createServer(function(req, res) {
   res.writeHead(200, {'Content-Type':'text/html'});
   res.end('<h1>Hello dongzhi test up</h1>')
});