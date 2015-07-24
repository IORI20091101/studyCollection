define("gozap/a", [ "./b", "./c" ], function(require, exports, module) {
    var b = require("./b");
    b.b();
    return function a() {
        console.log("this is a welcome");
    };
});