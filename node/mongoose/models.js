var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var _Member = new Schema({
    name: String,
    email: String,
    password: String
})

//为_User添加实例方法
_Member.methods.findByName = function(name, callback) {
    //这里的this.model 参数为注册model时的名字
    return this.model('Member').find({name: name}, callback);
}


// //为_User添加静态方法，静态方法在Model层就能使用
_Member.statics.findByEmail= function(email, callback) {
    return this.model('Member').find({email: email}, callback);
}


//**在调用mogoose.model的时候回自动创建集合类似 Member ==》 members  ， Users ==》users
//在此处注册model 名字为Model
exports.Member = mongoose.model('Member', _Member);
