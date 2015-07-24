define("gozap/a", [ "./b", "./c" ], function(require, exports, module) {
    var b = require("./b");
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
