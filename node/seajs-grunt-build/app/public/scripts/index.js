define(function(require, exports, module) {
    var $ = require('jquery');

    var a = require('./a');

    a();


    function init() {
        console.log('has enter index');
    }

   init();
});