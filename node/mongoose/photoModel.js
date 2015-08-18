var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var photoSchema = new mongoose.Schema({
    name: String,
    path: String
});


var Photo = mongoose.model("Photo", photoSchema);

module.exports = Photo;