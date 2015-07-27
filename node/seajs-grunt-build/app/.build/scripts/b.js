define("/scripts/b", [ "./c" ], function(require, exports, module) {
    var c = require("./c");
    c.c();
    exports.b = function() {
        console.info("this is b bbbb~~");
    };
});