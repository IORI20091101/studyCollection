var redis = require("redis");
var bcrypt = require("bcrypt");
var _ = require("underscore");
var db = redis.createClient();

//db.auth("123456");


function User(obj) {
    for( var key in obj ) {
        this[key] = obj[key]
    }
}

User.prototype.save = function(fn) {
    if( this.id ) {
        console.log("用户名已经被占用，请重新选择～～～");
        return false;
        this.update(fn);
    } else {
        var user = this;
        db.incr('user:ids', function( err, id ) {
            if(err) return fn(err);
            user.id = id;
            user.hashPassword(function(err) {
                if (err) return fn(err);
                user.update(fn);
            })
        })
    }
}

User.prototype.update = function(fn) {
    var user = this;
    var id = user.id;
    db.set("user:id:" + user.name, id, function(err) {
        if(err) return fn(err);

        db.hmset("user:" + id, user, function(err) {
            fn(err);
        })
    })
}

User.prototype.hashPassword = function(fn) {
    var user = this;

    bcrypt.genSalt(12, function(err, salt) {
        if(err) return fn(err);

        user.salt = salt;
        bcrypt.hash(user.pass, salt, function(err, hash) {
            if(err) return fn(err);
            user.pass = hash;
            fn();
        })
    })
}



User.getByName = function(name, fn) {
    User.getId(name, function(err, id) {
        if(err) return fn(err);
        User.get(id, fn);
    })

}


User.getId = function(name, fn) {
    db.get("user:id:"+name, fn);
}

User.get = function(id, fn) {
    console.log(id);
    db.hgetall('user:' + id, function(err, user) {
        console.log(user);
        if(err) return fn(err);
        fn(null, new User(user));
    })
}



User.authenticate = function(name, pass, fn) {
    User.getByName(name, function(err, user) {
        if(err) return fn(err);
        if(_.isEmpty(user)) {
            return fn();
        } else {
            bcrypt.hash(pass, user.salt, function(err, hash) {
                if(err) return fn(err);
                if(hash == user.pass) {
                    return fn(null, user);
                }

                fn();
            })
        }

    });
}


module.exports = User;



// var tobi = new User({
//     name:"Tobi",
//     pass: 'im a ferret',
//     age: 2
// })
// tobi.save(function(err) {
//     if(err) throw err;
//     console.log('userid %d ', tobi.id);
// })