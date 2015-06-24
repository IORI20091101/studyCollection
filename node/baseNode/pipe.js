//流读取文件精简
require('http').createServer(function(req, res) {
    res.writeHead(200, {'Content-Type':'image/png'});
    var stream = require('fs').createReadStream('image.png');
    stream.on('data', function(data) {
        res.write(data);
    });

    stream.on('end', function() {
        res.end();
    })
}).listen(3000);



//以上代码可以通过以下来简化
require('http').createServer(function(req, res) {
    res.writeHead(200, {'Content-Type':'image/png'});
    require('fs').createReadStream('image.png').pipe(res);

}).listen(3000);
