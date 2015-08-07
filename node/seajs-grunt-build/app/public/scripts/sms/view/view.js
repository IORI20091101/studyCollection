define(function (require, exports, module) {
    var tmpl = require('../tmpl/tmpl');
    //console.log(tmpl);


    exports.smsView = function() {
        //console.log('进入 concat');
        $(".content").html(tmpl.tmpl);
    }

    exports.smsTestView = function() {
        //console.log('进入 concat test');
        $(".content").html(tmpl.tmplTest);
    }
});