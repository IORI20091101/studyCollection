//创建一个表
var dbHost = "127.0.0.1";
var dbPort = "5984";
var dbName = "users";

var couchdb = require('felix-couchdb');
var client = couchdb.createClient(dbPort, dbHost);
var db = client.db(dbName);

db.exists(function(err, exists) {
    if( !exists ) {
        db.create();
        console.log("Database " + dbName +" created.");
    } else {
        console.log("Database " + dbName + " exists." );
    }
});

//在CouchDB中创建一个文档
var dbHost = "127.0.0.1";
var dbPort = "5984";
var dbName = "users";

var couchdb = require('felix-couchdb');
var client = couchdb.createClient(dbPort, dbHost);

var user = {
    name: {
        first: "John",
        last: "Doe"
    }
}

var db = client.db(dbName);

db.saveDoc('jdoe', user, function(err, doc) {
    if( err ) {
        console.log(JSON.stringfy(err));
    } else {
        console.log('Saved user.')
    }
});


//从CouchDB中读取数据
var dbHost = "127.0.0.1";
var dbPort = "5984";
var dbName = "users";

var couchdb = require('felix-couchdb');
var client = couchdb.createClient(dbPort, dbHost);
var db = client.db(dbName);
db.getDoc('jdoe', function( err, doc ) {
    console.log(doc);
});



//从CouchDB中更新一条数据
var dbHost = "127.0.0.1";
var dbPort = "5984";
var dbName = "users";

var couchdb = require('felix-couchdb');
var client = couchdb.createClient(dbPort, dbHost);

var db = client.db(dbName);

db.getDoc('jdoe', function(err, doc) {
    doc.name.first = 'Johnny';
    doc.email = 'jdoe@johndoe.com';
    db.saveDoc('jdoe', doc);
    db.getDoc('jdoe', function(err, revisedUser) {
        console.log(revisedUser);
    });
});



//从CouchDB中删除一条数据
var dbHost = "127.0.0.1";
var dbPort = "5984";
var dbName = "users";

var couchdb = require('felix-couchdb');
var client = couchdb.createClient(dbPort, dbHost);

var db = client.db(dbName);
db.getDoc('jdoe', function(err, doc) {
    db.removeDoc(doc._id, doc._rev);
});