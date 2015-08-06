/*var crypto = require("crypto");
var md5 = crypto.createHash("md5");

md5.update("sundonghzi");

console.log(md5.digest('hex'))
*/

/**
    var shaSum = crypto.createHash('sha256');
    shaSum.update(newpassword);
    var hashedPassword = shaSum.digest('hex');
*/




//使用这条命令来生成一个PEM的key 私钥
//openssl genrsa -out key.pem 1024
/*
var crypto = require("crypto");
var fs = require("fs");
var pem = fs.readFileSync('key.pem');
var key = pem.toString('ascii');

var hmac = crypto.createHmac("sha1", key);
hmac.update('sundonghzi');

var pass = hmac.digest('hex');
console.log(pass);
*/

//利用私钥生成公钥
//openssl req -key key.pem -new -x509 -out cert.pem