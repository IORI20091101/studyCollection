var pg = require('pg');

var connectionString = "pg://dev:dev@localhost:5432/upandrunning";
//查询
pg.connect(connectionString, function(err, client) {
    if( err ) {
        console.log(err);
    } else {
        var sqlStmt = "SELECT username, firstname, lastname FROM users";
        client.query(sqlStmt, null, function(err, result) {
            if( err ) console.log(err);

            console.log(result);
            pg.end();
        });
    }
});




//插入数据

var pg = require('pg');

var connectionString = "pg://dev:dev@localhost:5432/upandrunning";
pg.connect(connectionString, function(err, client) {
    if( err ) {
        console.log(err);
    } else {
        var sqlStmt = "INSERT INTO users( username, firstname, lastname ) VALUES ( $1, $2, $3)";
        var sqlParams = ['jdoe', 'john', 'Doe'];
        var quer = client.query(sqlStmt, sqlParams, function(err, result) {
            if( err ) {
                console.log(err);
            } else {
                console.log(result);
            }
            pg.end();
        });
    }
});



//更新数据
var pg = require('pg');
var connectionString = "pg://dev:dev@localhost:5432/upandrunning";
pg.connect(connectionString, function(err, client) {
    if( err ) {
        console.log(err);
    } else {
        var sqlStmt = "UPDATE users SET firstname = $1 WHERE username= $2";
        var sqlParams = ['jane', 'jdoe'];
        var quer = client.query(sqlStmt, sqlParams, function(err, result) {
            if( err ) {
                console.log(err);
            } else {
                console.log(result);
            }
            pg.end();
        });
    }
});


//删除数据
var pg = require("pg");
var connectionString = "pg://dev:dev@localhost:5432/upandrunning";
pg.connect(connectionString, function(err, client) {
    if( err ) {
        console.log(err);
    } else {
        var sqlStmt = "DELETE FROM users WHERE username= $1";
        var sqlParams = ['jdoe'];
        var quer = client.query(sqlStmt, sqlParams, function(err, result) {
            if( err ) {
                console.log(err);
            } else {
                console.log(result);
            }
            pg.end();
        });
    }
});
