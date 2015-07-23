define(function(require, exports, module) {
    function c() {
        console.warn('this is c ~~~~');
    }
    module.exports = {
        c: c
    }
})