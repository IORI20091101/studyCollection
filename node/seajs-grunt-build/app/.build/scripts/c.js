define("/scripts/c", [], function(require, exports, module) {
    function c() {
        console.log("this is c ~~~~");
    }
    module.exports = {
        c: c
    };
});