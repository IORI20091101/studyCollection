var mysql = require('mysql');
var conn;

function handleError() {
    conn = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'123456',
        database:'nodejs',
        port: 3306
    });

    //密码错误导致数据库连接错误，2秒重试
    conn.connect(function(err) {
        if( err ){
            console.log('error when connecting to db:' + err);
            setTimeout(handleError, 2000);
        }
    });


    //数据库宕机
    conn.on("error", function(err) {
        console.log('-----------------------------');
        console.log("db error", err);

        // 如果是连接断开，自动重新连接
        if( err.code == 'PROTOCOL_CONNECTION_LOST' ) {
                handleError();
        } else {
            throw err;
        }
    });
}

handleError();


// 模拟连接超时，PROTOCOL_CONNECTION_LOST
//如果wait_timeout 10毫秒，会自动断开连接，此时去查询会报错， 会被on error捕捉到
function query() {
    console.log(new Date());
    var sql = 'show variables like "wait_timeout"';
    conn.query(sql, function(err, res) {
        console.log(res);
    })
}
query();

setInterval(query, 15*1000);