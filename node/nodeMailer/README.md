##测试邮件发送服务 nodeMailer
配置详情
```javascript
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    //service: 'Gmail',
    host: "smtp.126.com", // 主机
    secureConnection: false, // 使用 SSL
    auth: {
        user: 'sundongzhi11014111@126.com',
        pass: 'xxxxx'
    }
});

var mailOptions = {
    from: 'sundongzhi11014111@126.com', // sender address
    to: 'zhangliyuan@gozap.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ✔', // plaintext body
    html: '<b>Hello world ✔</b>' // html body
};

transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    }else{
        console.log('Message sent: ' + info.response);
    }
});
```