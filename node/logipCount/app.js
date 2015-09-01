var _ = require('underscore');

var path = require('path');

var fs = require('fs');

var readline = require("readline");

var argements = process.argv.splice(2)[0];
console.log(argements);


var readStream = fs.createReadStream(argements); //"/Users/toshiba/Downloads/www.ezhe.com.log-20150811"


var mysql = require('mysql');
var pool = mysql.createPool({
    host:'172.16.0.254',
    user:'root',
    password:'gozapdev',
    database:'ehaitao',
    port: 4300
});



var ipData = [];

var str = "";
readStream.on("data", function(chunk) {
    str += chunk;
});
readStream.on("end", function() {
    var strArr = str.split('\n');

    _.each(strArr, function(line) {
        log2data(line)
    });

    console.log('Have a good day!~~~');

    var groupData = _.groupBy(ipData, function(val) {
        return val.web;
    })
    //console.log(groupData["www.ezhe.com"]);

    var utcdate = new Date().toLocaleDateString();
    var total = "";
    var uniqtotal = "";
    var platform = "";

    var wwwPV = 0;
    var apiPV = 0;
    var wapPV = 0;

    var wwwUV = 0;
    var apiUV = 0;
    var wapUV = 0;
    _.each(groupData, function(val, key) {
        total = val.length;
        uniqtotal = _.uniq(val, function(v) {
            return v.ip;
        });
        platform = key;
        if( key == "www.ezhe.com" || "dohko.www.ezhe.com" ) {
            wwwPV = val.length;
            wwwUV = uniqtotal.length;

        } else if( key == "m.ezhe.com" || "dohko.m.ezhe.com") {
            wapPV = val.length;
            apiUV = uniqtotal.length;

        } else if( key == "api.ezhe.com" || "dohko.api.ezhe.com" ) {
            apiPV = val.length;
            wapUV = uniqtotal.length;

        }


    });

    var selectSQL = 'insert into tbl_ip_statistics(date, wwwPV, apiPV, wapPV, wwwUV, apiUV, wapUV ) values(?,?,?,?,?,?,?)';
    //连接池，已经解决了自动重连的问题了，后面我们的开发，可以尽量使用pooling的方式。
    pool.getConnection(function(err, conn) {
        if( err ) console.log("POOL ==>" + err);



        conn.query(selectSQL,[ utcdate, wwwPV, apiPV, wapPV, wwwUV, apiUV, wapUV ] ,function(err, rows) {
            if( err ) console.log(err);

            if( rows.affectedRows == 1 ) {
                console.log("插入数据成功！");

            }


            conn.release();
        });

    });




    var hourData =_.groupBy(ipData, function(item, i) {
        var str = Number(item.dateStr.split(':')[1]);
        return str;
    });


    var indexArr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];

    _.each(indexArr,function(v, k) {
        if(  hourData[k] == null || !hourData[k] ) {
            hourData[k] = [];
        }
    });





    var insertSql = 'insert into tbl_ip_time_statisitcs('+
        'date,'+
        ' hour1,'+
        ' hour2,'+
        ' hour3,'+
        ' hour4,'+
        ' hour5,'+
        ' hour6,'+
        ' hour7,'+
        ' hour8,'+
        ' hour9,'+
        ' hour10,'+
        ' hour11,'+
        ' hour12,'+
        ' hour13,'+
        ' hour14,'+
        ' hour15,'+
        ' hour16,'+
        ' hour17,'+
        ' hour18,'+
        ' hour19,'+
        ' hour20,'+
        ' hour21,'+
        ' hour22,'+
        ' hour23,'+
        ' hour24'+
        ' ) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
    //连接池，已经解决了自动重连的问题了，后面我们的开发，可以尽量使用pooling的方式。
    pool.getConnection(function(err, conn) {
        if( err ) console.log("POOL ==>" + err);

        conn.query(insertSql,[
            utcdate,
            hourData[0].length,
            hourData[1].length,
            hourData[2].length,
            hourData[3].length,
            hourData[4].length,
            hourData[5].length,
            hourData[6].length,
            hourData[7].length,
            hourData[8].length,
            hourData[9].length,
            hourData[10].length,
            hourData[11].length,
            hourData[12].length,
            hourData[13].length,
            hourData[14].length,
            hourData[15].length,
            hourData[16].length,
            hourData[17].length,
            hourData[18].length,
            hourData[19].length,
            hourData[20].length,
            hourData[21].length,
            hourData[22].length,
            hourData[23].length
           ] ,function(err, rows) {
            if( err ) console.log(err);

            if( rows.affectedRows == 1 ) {
                console.log("插入数据成功！");

            }

            conn.release();
        });

    });




});

function log2data(line) {

    var data = {},
        list = line.split(' ');
    if( list.length <=1 ) {
        //console.log('data length error ,invalid data');
        return false;
    } else {
        data.ip = list[0];
        data.dateStr = list[3].substring(1);
        data.web = list[5].substring(1, (list[5].length - 1) );

        ipData.push(data);
    }

}



