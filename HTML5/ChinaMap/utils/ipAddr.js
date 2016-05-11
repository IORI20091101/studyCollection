
var http = require('http');


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


function dealLine(data) {
    var reg = /(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])/g;
    if( reg.test(data) ) {
        var sm = data.match(reg);
        console.log(sm[0]);
        return sm[0]
    } else {
        return false;
    }

}

module.exports = {
    getIpInfo: getIpInfo,
    dealLine: dealLine,
    ipData:ipData
}