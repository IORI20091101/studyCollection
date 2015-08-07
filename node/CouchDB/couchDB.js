//CouchDB使用http请求来创建和操作数据库下面是原始的操作方法
var http = require("http");
var qs = require('querystring');
var url = require('url');

var dbHost = "127.0.0.1";
var dbPort = "5984";

deleteDb = function(res, dbpath) {
    var client = http.createClient(dbPort, dbHost);
    var request = client.request("DELETE", dbpath);
    request.end();

    request.on('response', function(response) {
        response.on('end', function() {
            if( response.statusCode == 200 ) {
                showDbs(res, "Delete database.");
            } else {
                showDbs(res, "Could not delete database");
            }
        });
    });
}


createDb = function(res, dbname) {
    var client = http.createClient(dbPort, dbHost);
    var request = client.request("PUT", "/" + dbname);
    request.end();

    request.on("response", function(response) {
        response.on("end", function() {
            if( response.statusCode == 201 ) {
                showDbs(res, dbname+" created.");
            }
        });
    });
}


showDbs = function(res, message) {
    var client = http.createClient(dbPort, dbHost);
    var request = client.request("GET", "/_all_dbs");
    request.end();

    request.on("response", function(response) {
        var responseBody = "";
        response.on("data", function(chunk) {
            responseBody += chunk;
        })
        response.on("end", function() {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write("<form method='post'>");
            res.write("New DataBase Name: <input type='text' name='dbname'/>");
            res.write("<input type='submit'/>");
            res.write("</form>");
            if( null != message ) {
                res.write('<h1>' + message + '</h1>');
            }
            res.write("<h1>Active database:</h1>");
            res.write("<ul>");
            var dblist = JSON.parse(responseBody);
            for( var i = 0; i < dblist.length; i++ ) {
                var dbname = dblist[i];
                res.write("<li><a href='/'"+ dbname +">"+ dbname +"</a></li>");
            }
            res.write("</ul>");
            res.end();
        });
    })
}


http.createServer(function(req, res) {
    if( req.method == 'POST' ) {
        var body == '';
        req.on('data', function(data) {
            body+=data;
        })
        req.on("end", function() {
            var POST = qs.parse(body);
            var dbname = POST['dbname'];
            if( null != dbname ) {
                createDb(res, dbname);
            } else {
                showDbs(res, "Bad DB name, cannot create database");
            }
        });
    } else {
        var path = url.parse(req.url).pathname;
        if( path != "/" ) {
            deleteDb(res, path);
        } else {
            showDbs(res);
        }
    }
}).listen(8080);