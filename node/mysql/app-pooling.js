var mysql = require('mysql');
var pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'nodejs',
    port: 3306
});

var selectSQL = 'select * from t_user limit 10';
//连接池，已经解决了自动重连的问题了，后面我们的开发，可以尽量使用pooling的方式。
pool.getConnection(function(err, conn) {
    if( err ) console.log("POOL ==>" + err);

    conn.query(selectSQL, function(err, rows) {
        if( err ) console.log(err);
        console.log("SELECT ==>");

        for(var i in rows) {
            console.log(rows[i]);
        }
        conn.release();
    });

})