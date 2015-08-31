var _ = require('underscore');

var path = require('path');

var fs = require('fs');

var readline = require("readline");

var readStream = fs.createReadStream("/Users/toshiba/Downloads/www.ezhe.com.log-20150811");


var mysql = require('mysql');
var pool = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'',
    database:'nodejs',
    port: 3306
});



var ipData = [];

var str = "";
readStream.on("data", function(chunk) {
    str += chunk;
});
readStream.on("end", function() {
    //console.log(str);
    var strArr = str.split('\n');

    _.each(strArr, function(line) {
        log2data(line)
    });

    console.log('Have a good day!~~~');

    var groupData = _.groupBy(ipData, function(val) {
        return val.web;
    })
    //console.log(groupData["www.ezhe.com"]);

    _.each(groupData, function(val, key) {
        var utcdate = new Date().toLocaleDateString();
        var total = val.length;
        var uniqtotal = _.uniq(val, function(v) {
            return v.ip;
        });
        var platform = key;

        var selectSQL = 'insert into t_log_domain_count(utcdate, platform, total, uniqtotal) values(?,?,?,?)';
        //连接池，已经解决了自动重连的问题了，后面我们的开发，可以尽量使用pooling的方式。
        pool.getConnection(function(err, conn) {
            if( err ) console.log("POOL ==>" + err);



            conn.query(selectSQL,[ utcdate, platform, total, uniqtotal.length ] ,function(err, rows) {
                if( err ) console.log(err);
                console.log("插入数据成功！");

                // for(var i in rows) {
                //     console.log(rows[i]);
                // }
                conn.release();
            });

        });


        var hourData =_.groupBy(val, function(item, i) {
            var str = Number(item.dateStr.split(':')[1]);

            return str;
        });

         var uqHourData = _.groupBy(uniqtotal, function(v) {
            var str = Number(v.dateStr.split(':')[1]);

            return str;
        });



        var insertSql = 'insert into t_log_domain_count_hour ('+
            'utcdate, platform,'+
            'hour0count,'+
            'hour1count,'+
            'hour2count,'+
            'hour3count,'+
            'hour4count,'+
            'hour5count,'+
            'hour6count,'+
            'hour7count,'+
            'hour8count,'+
            'hour9count,'+
            'hour10count,'+
            'hour11count,'+
            'hour12count,'+
            'hour13count,'+
            'hour14count,'+
            'hour15count,'+
            'hour16count,'+
            'hour17count,'+
            'hour18count,'+
            'hour19count,'+
            'hour20count,'+
            'hour21count,'+
            'hour22count,'+
            'hour23count,'+
            'uqhour0count,'+
            'uqhour1count,'+
            'uqhour2count,'+
            'uqhour3count,'+
            'uqhour4count,'+
            'uqhour5count,'+
            'uqhour6count,'+
            'uqhour7count,'+
            'uqhour8count,'+
            'uqhour9count,'+
            'uqhour10count,'+
            'uqhour11count,'+
            'uqhour12count,'+
            'uqhour13count,'+
            'uqhour14count,'+
            'uqhour15count,'+
            'uqhour16count,'+
            'uqhour17count,'+
            'uqhour18count,'+
            'uqhour19count,'+
            'uqhour20count,'+
            'uqhour21count,'+
            'uqhour22count,'+
            'uqhour23count,'+
            'total, uniqtotal'+
            ') values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
        //连接池，已经解决了自动重连的问题了，后面我们的开发，可以尽量使用pooling的方式。
        pool.getConnection(function(err, conn) {
            if( err ) console.log("POOL ==>" + err);

            conn.query(insertSql,[
                utcdate, platform,
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
                hourData[23].length,
                uqHourData[0].length,
                uqHourData[1].length,
                uqHourData[2].length,
                uqHourData[3].length,
                uqHourData[4].length,
                uqHourData[5].length,
                uqHourData[6].length,
                uqHourData[7].length,
                uqHourData[8].length,
                uqHourData[9].length,
                uqHourData[10].length,
                uqHourData[11].length,
                uqHourData[12].length,
                uqHourData[13].length,
                uqHourData[14].length,
                uqHourData[15].length,
                uqHourData[16].length,
                uqHourData[17].length,
                uqHourData[18].length,
                uqHourData[19].length,
                uqHourData[20].length,
                uqHourData[21].length,
                uqHourData[22].length,
                uqHourData[23].length,
                total, uniqtotal.length ] ,function(err, rows) {
                if( err ) console.log(err);
                console.log("插入数据成功！");

                // for(var i in rows) {
                //     console.log(rows[i]);
                // }
                conn.release();
            });

        });


    });


});

// var rl = readline.createInterface({
//     input: readStream,
//     output: process.stdout
// });


// rl.on('line', function(line) {
//     //console.log(line);
//     log2data(line);


// }).on('close', function() {
//     console.log('Have a great day!');
//     process.exit(0);
// });

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



/*

create table t_log_domain_count_hour(
    utcdate varchar(255),
    platform varchar(255) not null,
    hour0count int not null ,
    hour1count int not null ,
    hour2count int not null ,
    hour3count int not null ,
    hour4count int not null ,
    hour5count int not null ,
    hour6count int not null ,
    hour7count int not null ,
    hour8count int not null ,
    hour9count int not null ,
    hour10count int not null ,
    hour11count int not null ,
    hour12count int not null ,
    hour13count int not null ,
    hour14count int not null ,
    hour15count int not null ,
    hour16count int not null ,
    hour17count int not null ,
    hour18count int not null ,
    hour19count int not null ,
    hour20count int not null ,
    hour21count int not null ,
    hour22count int not null ,
    hour23count int not null ,

    uqhour0count int not null ,
    uqhour1count int not null ,
    uqhour2count int not null ,
    uqhour3count int not null ,
    uqhour4count int not null ,
    uqhour5count int not null ,
    uqhour6count int not null ,
    uqhour7count int not null ,
    uqhour8count int not null ,
    uqhour9count int not null ,
    uqhour10count int not null ,
    uqhour11count int not null ,
    uqhour12count int not null ,
    uqhour13count int not null ,
    uqhour14count int not null ,
    uqhour15count int not null ,
    uqhour16count int not null ,
    uqhour17count int not null ,
    uqhour18count int not null ,
    uqhour19count int not null ,
    uqhour20count int not null ,
    uqhour21count int not null ,
    uqhour22count int not null ,
    uqhour23count int not null ,

    total int not null,
    uniqtotal int not null ,
    primary key (utcdate ,platform )
);

*/
