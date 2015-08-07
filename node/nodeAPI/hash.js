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


//如果有了公钥和私钥
//1，使用Cipher加密 支持的算法是从openssl中实现的blowfish， aes192

var crypto = require('crypto');
var fs = require('fs');
var pem = fs.readFileSync('key.pem');
var key = pem.toString('ascii');

var cipher = crypto.createCipher('blowfish', key);

cipher.update(new Buffer(4), 'binary', 'hex');

cipher.update(new Buffer(4), 'binary', 'hex');

cipher.update(new Buffer(4), 'binary', 'hex');

cipher.final('hex');

//使用Decipher解密

var crypto = require('crypto');
var fs = require('fs');
var pem = fs.readFileSync('key.pem');
var key = pem.toString('ascii');
var plaintext = new Buffer("abcdeflsdlfwe");
var encrypted = "";

var cipher = crypto.createCipher('blowfish', key);

encrypted += cipher.update(plaintext, 'binary', 'hex');

encrypted += cipher.final('hex');

var decrypted = "";
var decipher = crypto.createDecipher('blowfish', key);
decrypted += decipher.update(encrypted, 'binary', 'hex');

decrypted += decipher.final('hex');

var output = new Buffer(decrypted);


//使用sign来创作签名
var sign = crypto.createSign('RSA-SHA256');
sign.update('abcdef');
var sig = sign.sign(key, 'hex');



//使用verify来验证签名
var crypto = require("crypto");
var fs = require('fs');

var privatePem = fs.readFileSync('key.pem');
var publicPem = fs.readFileSync('cert.pem');

var key = privatePem.toString();
var pubKey = publicPem.toString();

var data = "abcded";

var sign = crypto.createSign('RSA-SHA256');
sign.update(data);
var sig = sign.sign(key, 'hex');

var verify = crypto.createVerify('RSA-SHA256');
verify.update(data);

verify.verify(pubKey, sig, 'hex');
