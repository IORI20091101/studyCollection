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

define("gozap/a", [ "gozap/b", "gozap/c" ], function(require, exports, module) {
    var b = require("gozap/b");
    b.b();
    return function a() {
        console.log("this is a welcome");
    };
});

define("gozap/b", [ "gozap/c" ], function(require, exports, module) {
    var c = require("gozap/c");
    c.c();
    exports.b = function() {
        console.info("this is b bbbb~~");
    };
});

define("gozap/c", [], function(require, exports, module) {
    function c() {
        console.warn("this is c ~~~~");
    }
    module.exports = {
        c: c
    };
});
