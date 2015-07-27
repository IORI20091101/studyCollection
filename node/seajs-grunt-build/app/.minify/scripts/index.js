define("/scripts/c", [], function(require, exports, module) {
    function c() {
        console.log("this is c ~~~~");
    }
    module.exports = {
        c: c
    };
});

define("/scripts/b", [ "./c" ], function(require, exports, module) {
    var c = require("./c");
    c.c();
    exports.b = function() {
        console.info("this is b bbbb~~");
    };
});

define("/scripts/a", [ "./b", "./c" ], function(require, exports, module) {
    var b = require("./b");
    b.b();
    return function a() {
        console.log("this is a welcome");
    };
});

define("/scripts/index", [ "/vendor/jquery.js", "./a", "./b", "./c" ], function(require, exports, module) {
    var $ = require("/vendor/jquery.js");
    var a = require("./a");
    a();
    function init() {
        console.log("has enter index");
    }
    init();
});
