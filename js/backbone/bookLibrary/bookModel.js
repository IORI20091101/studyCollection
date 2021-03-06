/**
 * Created by toshiba on 16/7/23.
 */
var mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/mydb', {mongos: true});
var db = mongoose.connection;
db.on('error', console.log.bind(console, 'connection error:'));
db.once('open', function(callback) {

})

var Promise = mongoose.Promise;

var Book = new mongoose.Schema({
    title: String,
    author: String,
    releaseDate: String,
    keywords: String
});

Book.methods.updateBook = function() {
    var self = this;
    var p = new Promise();

    self.update({})
}


var BookModel = mongoose.model('Book', Book);

module.exports = BookModel;