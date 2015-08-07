//未用明白
var vm = require('vm');
var fs = require('fs');

var code = fs.readFileSync("fs.js");


var script = vm.createScript(code);
script.runInNewContext({output:"Kick Ass"});