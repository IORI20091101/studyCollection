define(['require','scripts/a','scripts/config'], function(require, a) {
    /*require(['a'], function(a) {


    })*/
    //var a = require('a');

        alert("success get a");
        a.a();

        function index() {
            console.log("you has enter index page");
        }


        index();
});