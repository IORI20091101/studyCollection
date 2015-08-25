var _ = require("underscore");
var util = require('util');
var http = require('http');


//使用对象来设hash的值
var redis = require('redis');
var client = redis.createClient();


client.on('error', function(err) {
    console.log("Error " + err);
});


/**
 * 根据 ip 获取获取地址信息
 */
var getIpInfo = function(ip, cb) {
  var sina_server = 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json&ip=';
  var url = sina_server + ip;
  http.get(url, function(res) {
    var code = res.statusCode;
    if (code == 200) {
      res.on('data', function(data) {
        try {
          cb(null, JSON.parse(data));
        } catch (err) {
          cb(err);
        }
      });
    } else {
      cb({ code: code });
    }
  }).on('error', function(e) { cb(e); });
};

//处理读取到的日志数据并把ip地址 域名和时间解析出来
var dealLine = function(data) {
  var dataFinal = {};
  var ipReg = /(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])/g;
  var dateReg = /\[(.+)\]/g;
  var webReg = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?\"/;

  if( ipReg.test(data) ) {
      var ip = data.match(ipReg);
      dataFinal.ip = ip[0];
  }

  if( dateReg.test(data) ) {
      var dateStr = data.match(dateReg);
      dataFinal.dateStr = dateStr[0].slice(1,-7);
  }

  if( webReg.test(data) ) {
      var web = data.match(webReg);
      dataFinal.web = web[0].slice(0, -1);
  }

  if( !_.isEmpty(dataFinal) ) {
    return dataFinal;
  }
  return false;

}





var totalCount = 0;


Tail = require('tail').Tail;

var fileToTail = "./tmpDoc/www.ezhe.com.log-20150811";
var lineSeparator= "\n";
var fromBeginning = false;
var watchOptions = {}; //as per node fs.watch documentations

tail = new Tail(fileToTail, lineSeparator, watchOptions,fromBeginning)

tail.on("line", function(data) {
  var dataOri = dealLine(data);

  if( !dataOri || _.isEmpty(dataOri) ) {
    //console.log("ip address error!");
    return false;
  }
console.log("-----getLinedata: " + data);
  getIpInfo(dataOri.ip, function(err, msg) {
        if( !msg.province ) {
          //console.log("no province");
          return false;
        }
        dataOri.province = msg.province;

        ipData.forEach(function(v) {
            if( msg.province == v.name ) {
                v.count++;
                client.hset("ezheLogTotal", "province_"+v.id, v.count+"-"+ dataOri.dateStr +"-"+ dataOri.web);

                client.set("ezheLog_"+dataOri.dateStr, v.id + "-" + dataOri.web);
                client.expire("ezheLog_"+dataOri.dateStr, 60);
            }
        });

        totalCount++;

        client.hset("ezheLogTotal", "totalCount", totalCount);

        client.publish("ezhelog", "hello");

        console.log(totalCount);

    })
});

tail.on("error", function(error) {
  console.log('ERROR: ', error);
});




var ipData = [
    {
        count: 0,
        id: 1,
        name:"甘肃"
    },
    {
        count: 0,
        id: 2,
        name:"青海"
    },
    {
        count: 0,
        id: 3,
        name:"广西"
    },
    {
        count: 0,
        id: 4,
        name:"贵州"
    },
    {
        count: 0,
        id: 5,
        name:"重庆"
    },
    {
        count: 0,
        id: 6,
        name:"北京"
    },
    {
        count: 0,
        id: 7,
        name:"福建"
    },
    {
        count: 0,
        id: 8,
        name:"安徽"
    },
    {
        count:0,
        id: 9,
        name:"广东"
    },
    {
        count: 0,
        id: 10,
        name:"西藏"
    },
    {
        count: 0,
        id: 11,
        name:"新疆"
    },
    {
        count: 0,
        id: 12,
        name:"海南"
    },
    {
        count: 0,
        id: 13,
        name:"宁夏"
    },
    {
        count: 0,
        id: 14,
        name:"陕西"
    },
    {
        count: 0,
        id: 15,
        name:"山西"
    },
    {
        count: 0,
        id: 16,
        name:"湖北"
    },
    {
        count: 0,
        id: 17,
        name:"湖南"
    },
    {
        count: 0,
        id: 18,
        name:"四川"
    },
    {
        count: 0,
        id: 19,
        name:"云南"
    },
    {
        count: 0,
        id: 20,
        name:"河北"
    },
    {
        count: 0,
        id: 21,
        name:"河南"
    },
    {
        count: 0,
        id: 22,
        name:"辽宁"
    },
    {
        count: 0,
        id: 23,
        name:"山东"
    },
    {
        count: 0,
        id: 24,
        name:"天津"
    },
    {
        count: 0,
        id: 25,
        name:"江西"
    },
    {
        count: 0,
        id: 26,
        name:"江苏"
    },
    {
        count: 0,
        id: 27,
        name:"上海"
    },
    {
        count: 0,
        id: 28,
        name:"浙江"
    },
    {
        count: 0,
        id: 29,
        name:"吉林"
    },
    {
        count: 0,
        id: 30,
        name:"内蒙古"
    },
    {
        count: 0,
        id: 31,
        name:"黑龙江"
    },
    {
        count: 0,
        id: 32,
        name:"香港"
    },
    {
        count: 0,
        id: 33,
        name:"澳门"
    },
    {
        count: 0,
        id: 34,
        name:"台湾"
    }
];

