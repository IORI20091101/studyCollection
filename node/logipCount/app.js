var _ = require('underscore');

var path = require('path');

var fs = require('fs');

var readline = require("readline");


var program = require('commander');

program
  .version('0.0.1');

// must be before .parse() since
// node's emit() is immediate

program.on('--help', function(){
  console.log('  Examples:');
  console.log('');
  console.log('    $ node app /Users/toshiba/Downloads/www.ezhe.com.log-20150811');
  console.log('');
  console.log('');
}).parse(process.argv);

if (!program.args.length) {
    program.help();
}



var argements = process.argv.splice(2)[0];
console.log(argements);

var config = require('./config');

var readStream = fs.createReadStream(argements); //"/Users/toshiba/Downloads/www.ezhe.com.log-20150811"


var mysql = require('mysql');
var pool = mysql.createPool(config);



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

    var ipDataSort = _.groupBy(ipData, function(v) {
        return v.dateFinal;
    });

    _.each(ipDataSort, function(j,l) {
        var groupData = _.groupBy(j, function(val) {
            return val.web;
        })
        //console.log(groupData["www.ezhe.com"]);

        var utcdate = l;
        var total = "";
        var uniqtotal = "";
        var platform = "";

        var wwwPV = 0;
        var apiPV = 0;
        var wapPV = 0;

        var wwwUV = 0;
        var apiUV = 0;
        var wapUV = 0;

        var flag1 = false;
        var flag2 = false;

        console.log('Have a good day!~~~');



        _.each(groupData, function(val, key) {
            total = val.length;
            uniqtotal = _.uniq(val, function(v) {
                return v.ip;
            });
            platform = key;

            console.log(key);
            if( key == "www.ezhe.com" || key == "dohko.www.ezhe.com" ) {
                wwwPV = val.length;
                wwwUV = uniqtotal.length;

            } else if( key == "m.ezhe.com" || key =="dohko.m.ezhe.com") {
                wapPV = val.length;
                wapUV = uniqtotal.length;

            } else if( key == "api.ezhe.com" || key =="dohko.api.ezhe.com" ) {
                apiPV = val.length;
                apiUV = uniqtotal.length;

            }


        });

        pool.getConnection(function(err, conn) {
            if( err ) console.log("POOL ==>" + err);



            conn.query('select * from tbl_ip_statistics where date = "'+ l +'"',[] ,function(err, results) {
                if( err ) console.log(err);


                if( results && results.length == 0 ) {
                    var selectSQL = 'insert into tbl_ip_statistics(date, wwwPV, apiPV, wapPV, wwwUV, apiUV, wapUV ) values(?,?,?,?,?,?,?)';

                    pool.getConnection(function(err, conn) {
                        if( err ) console.log("POOL ==>" + err);



                        conn.query(selectSQL,[ l, wwwPV, apiPV, wapPV, wwwUV, apiUV, wapUV ] ,function(err, rows) {
                            if( err ) console.log(err);

                            if( rows.affectedRows == 1 ) {
                                console.log("插入数据成功！");
                            }

                            conn.release();
                        });

                    });
                } else {

                    var resulsData  = results[0];
                    wwwPV += resulsData.wwwPV;
                    apiPV += resulsData.apiPV;
                    wapPV += resulsData.wapPV;
                    wwwUV += resulsData.wwwUV;
                    apiUV += resulsData.apiUV;
                    wapUV += resulsData.wapUV;

                    var updateSQL = 'update tbl_ip_statistics set wwwPV=?, apiPV=?, wapPV=?, wwwUV=?, apiUV= ?, wapUV= ? where id= ' + resulsData.id;
                    pool.getConnection(function(err, conn) {
                        if( err ) console.log("POOL ==>" + err);


                        conn.query(updateSQL,[  wwwPV, apiPV, wapPV, wwwUV, apiUV, wapUV ] ,function(err, rows) {
                            if( err ) console.log(err);

                                if( rows.changedRows > 0 ) {
                                    console.log("更新数据成功！");

                                }

                            conn.release();
                        });

                    });
                }


                conn.release();
            });

        });


        var hourData =_.groupBy(j, function(item, i) {
            var str = Number(item.dateStr.split(':')[1]);
            return str;
        });


        var indexArr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];

        _.each(indexArr,function(v, k) {
            if(  hourData[k] == null || !hourData[k] ) {
                hourData[k] = [];
            }
        });




        pool.getConnection(function(err, conn) {
            if( err ) console.log("POOL ==>" + err);

            conn.query('select * from tbl_ip_time_statisitcs where date = "'+ l +'"',[] ,function(err, results) {
                if( err ) console.log(err);


                if( results && results.length == 0 ) {
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


                    pool.getConnection(function(err, conn) {
                        if( err ) console.log("POOL ==>" + err);

                        conn.query(insertSql,[
                            l,
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
                } else {

                    var resData  = results[0];
                    var hour1 = hourData[0].length + resData.hour1;
                    var hour2 = hourData[1].length + resData.hour2;
                    var hour3 = hourData[2].length + resData.hour3;
                    var hour4 = hourData[3].length + resData.hour4;
                    var hour5 = hourData[4].length + resData.hour5;
                    var hour6 = hourData[5].length + resData.hour6;
                    var hour7 = hourData[6].length + resData.hour7;
                    var hour8 = hourData[7].length + resData.hour8;
                    var hour9 = hourData[8].length + resData.hour9;
                    var hour10 = hourData[9].length + resData.hour10;
                    var hour11 = hourData[10].length + resData.hour11;
                    var hour12 = hourData[11].length + resData.hour12;
                    var hour13 = hourData[12].length + resData.hour13;
                    var hour14 = hourData[13].length + resData.hour14;
                    var hour15 = hourData[14].length + resData.hour15;
                    var hour16 = hourData[15].length + resData.hour16;
                    var hour17 = hourData[16].length + resData.hour17;
                    var hour18 = hourData[17].length + resData.hour18;
                    var hour19 = hourData[18].length + resData.hour19;
                    var hour20 = hourData[19].length + resData.hour20;
                    var hour21 = hourData[20].length + resData.hour21;
                    var hour22 = hourData[21].length + resData.hour22;
                    var hour23 = hourData[22].length + resData.hour23;
                    var hour24 = hourData[23].length + resData.hour24;


                    var updateSQL = 'update tbl_ip_time_statisitcs set hour1 = ?,' +
                                                                       'hour2 = ?,' +
                                                                       'hour3 = ?,' +
                                                                       'hour4 = ?,' +
                                                                       'hour5 = ?,' +
                                                                       'hour6 = ?,' +
                                                                       'hour7 = ?,' +
                                                                       'hour8 = ?,' +
                                                                       'hour9 = ?,' +
                                                                       'hour10 = ?,' +
                                                                       'hour11 = ?,' +
                                                                       'hour12 = ?,' +
                                                                       'hour13 = ?,' +
                                                                       'hour14 = ?,' +
                                                                       'hour15 = ?,' +
                                                                       'hour16 = ?,' +
                                                                       'hour17 = ?,' +
                                                                       'hour18 = ?,' +
                                                                       'hour19 = ?,' +
                                                                       'hour20 = ?,' +
                                                                       'hour21 = ?,' +
                                                                       'hour22 = ?,' +
                                                                       'hour23 = ?,' +
                                                                       'hour24 = ? ' +
                                                                       'where id= ' +resData.id;


                    pool.getConnection(function(err, conn) {
                        if( err ) console.log("POOL ==>" + err);


                        conn.query(updateSQL,[
                            hour1,
                            hour2,
                            hour3,
                            hour4,
                            hour5,
                            hour6,
                            hour7,
                            hour8,
                            hour9,
                            hour10,
                            hour11,
                            hour12,
                            hour13,
                            hour14,
                            hour15,
                            hour16,
                            hour17,
                            hour18,
                            hour19,
                            hour20,
                            hour21,
                            hour22,
                            hour23,
                            hour24
                        ] ,function(err, rows) {
                            if( err ) console.log(err);

                            if( rows.changedRows > 0 ) {
                                console.log("更新数据成功！");

                            }




                            conn.release();
                        });

                    });
                }


                conn.release();
            });

        });


    })

});


setTimeout(function() {
    process.exit(0);
}, 30000)

var regional = {
    "january" : "01", "february":"02", "march":"03", "april":"04", "may":"05", "june":"06", "july":"07", "august":"08", "september":"09", "october":"10", "november":"11", "december":"12"
}

function covertMonth(mon) {
    var lowMon = mon.toLowerCase();
    var key = "";
    _.each(regional, function(v, k) {
        if( (k).indexOf(lowMon) >=0 ) {
            key = k;
            return false;
        }
    });
    return regional[key];

}

function log2data(line) {

    var data = {},
        list = line.split(' ');
    if( list.length <=1 ) {
        //console.log('data length error ,invalid data');
        return false;
    } else {
        data.ip = list[0];
        var dateArr = list[3].substring(1);
        data.dateStr = list[3].substring(1);

        var dateList = dateArr.split(":")[0].split("/");
        data.dateFinal = dateList[2] + '-' + covertMonth(dateList[1]) + '-' + dateList[0];
        data.web = list[5].substring(1, (list[5].length - 1) );

        ipData.push(data);
    }

}

