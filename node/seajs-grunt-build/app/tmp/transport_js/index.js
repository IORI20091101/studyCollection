define("gozap/index", [ "/vendor/jquery.js", "./a", "./b", "./c" ], function(require, exports, module) {
    var $ = require("/vendor/jquery.js");
    var a = require("./a");
    a();
    function init() {
        console.log("has enter index");
    }
    module.exports = {
        init: init
    };
});