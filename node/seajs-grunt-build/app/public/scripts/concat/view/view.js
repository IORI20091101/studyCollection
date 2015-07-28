define(function (require, exports, module) {
    var tmpl = require('../tmpl/tmpl');
    //console.log(tmpl);
    exports.concatView = function() {
        //console.log('进入 concat');
        $(".content").html(tmpl.tmpl);
    }

    exports.concatTestView = function() {
        //console.log('进入 concat test');
        $(".content").html(tmpl.tmplTest);
    }
});