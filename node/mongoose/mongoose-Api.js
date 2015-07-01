//to do mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/mydb', {mongos: true});

var db = mongoose.connection;

db.on('error', console.log.bind(console, 'connection error:'));
db.once('open', function(callback) {

})


var userScheme = mongoose.Scheme({
    first: String,
    last: String,
    emain: String,
    password: String
});

UserScheme.methods.intro = function() {
    var greeting = this.name?"hello my name is" + last + first+"!":"there is no name!";
    console.log(greeting);
}

var User = mongoose.model('User', userScheme);

var luna = new User({
    first:'luna',
    last:'jing',
    email:'luna@gozap.com',
    password:'123456'
});

console.log(luna);

luna.intro();

luna.save(function (err, luna) {
  if (err) return console.error(err);
  luna.intro();
});

User.find(function (err, user) {
  if (err) return console.error(err);
  console.log(user);
});