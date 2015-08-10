//基础的get和set
var redis = require('redis'),
    client = redis.createClient();

client.on('error', function(err) {
    consnole.log("Error " + err);
});

client.set("key1", "my String!", redis.print);
console.log("Getting key1");

client.get("key1", function(err, reply) {
    console.log("Results for key1:");
    console.log(reply);
    client.end(0);
});




//每次设置一个hash的值
var redis = require('redis');
var client = redis.createClient();

client.on('error', function(err) {
    consnole.log("Error " + err);
});
console.log("Settign user hash");

client.hset("user", "username","johndoe");
client.hset("user", "firstname","john");
client.hset("user", "lastname","doe");

client.hkeys("user", function(err, replies) {
    console.log("Results for user:");
    console.log(replies.length + " replies :");

    replies.forEach(function(reply, i) {
        console.log(i + ": " + reply);
    });

    client.end();
});



//同时设置多个hash的值
var redis = require('redis');
var client = redis.createClient();

client.on('error', function(err) {
    consnole.log("Error " + err);
});
console.log("Settign user hash");
client.hset("user", "username","johndoe", "firstname", "john","lastname","doe");

client.hkeys("user", function(err, replies) {
    console.log("Results for user:");
    console.log(replies.length + " replies :");

    replies.forEach(function(reply, i) {
        console.log(i + ": " + reply);
    });

    client.end();
});



//使用对象来设置多个hash的值
var redis = require('redis');
var client = redis.createClient();

client.on('error', function(err) {
    consnole.log("Error " + err);
});


var user = {
    username: 'johndoe',
    firstname:'john',
    lastname:'doe',
    email:'sundongzhi@gozap.com',
    website:'http://www.johndeo.com'
};

console.log("Settign user hash");
client.hset("user", user);

client.hkeys("user", function(err, replies) {
    console.log("Results for user:");
    console.log(replies.length + " replies :");

    replies.forEach(function(reply, i) {
        console.log(i + ": " + reply);
    });

    client.end();
});


//在redis中使用列表
var reis = require('redis');
var client = redis.createClient();
client.on('error', function(err) {
    consnole.log("Error " + err);
});
client.lpush("pendingusers", "users1");
client.lpush("pendingusers", "users2");
client.lpush("pendingusers", "users3");
client.lpush("pendingusers", "users4");

client.rpop("pendingusers", function(err, username) {
    if( !err ) {
        console.log("Processing " + username);
    }
    client.end();
});


//redis中的集合
var reis = require('redis');
var client = redis.createClient();
client.on('error', function(err) {
    consnole.log("Error " + err);
});
client.sadd("myteam", "users1");
client.sadd("myteam", "users2");
client.sadd("myteam", "users3");

client.smembers("myteam", function(err, members) {
    if( !err ) {
        console.log(members);
    }
    client.end();
});

//输出user1 user2 user3


//使用redis进行列表排序
var reis = require('redis');
var client = redis.createClient();
client.on('error', function(err) {
    consnole.log("Error " + err);
});
client.zadd("contestants",60, "Deboran");
client.zadd("contestants",65, "Deboran2");
client.zadd("contestants",26, "Deboran3");
client.zadd("contestants",62, "Deboran4");
client.zadd("contestants",24, "Deboran5");
client.zadd("contestants",60, "Deboran6");
client.zadd("contestants",60, "Deboran");

client.zcard("contestants", function(err, length) {
    if( !err ) {
        var contestantCount = length;
        var memberPerTeam = Math.ceil(contestantCount / 3);
        client.zrange("contestants", membersPerTerm*0, membersPerTerm*1-1, function(err, values) {
            console.log("Yong team:" + values);
        });

        client.zrange("contestants", membersPerTerm*1, membersPerTerm*2-1, function(err, values) {
            console.log("middle team:" + values);
        });

        client.zrange("contestants", membersPerTerm*2, contestantCount, function(err, values) {
            console.log("Elder team:" + values);
            client.end();
        });
    }
});


//使用redis订阅和发布
var redis=require("redis"),
    talkactiveClient = redis.createClient(),
    pensiveClient = redis.createClient;

pensiveClient.on("subscribe", function(channel, count) {
    talkactiveClient.publish(channel, "Welcome to" + channel);
    talkactiveClient.publish(channel, "You subscribed to "+ count + " channels!");
});


pensiveClient.on("unsubscribe", function(channel, count) {
    if( count == 0 ) {
        talkactiveClient.end();
        pensiveClient.end();
    }
})


pensiveClient.on("message", function(channel, message) {
    console.log(channel + " : " + message);
});

pensiveClient.on("ready", function() {
    pensiveClient.subscribe("quiet channel", "peaceful channel", "noisy channel");

    setTimeout(function() {
        pensiveClient.unsubscribe("quiet channel", "peaceful channel", "noisy channel")
    },1000)
})
