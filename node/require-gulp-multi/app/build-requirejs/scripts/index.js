require.config({
    baseUrl:'/scripts',
    paths:{
        jquery: '../vendor/jquery-2.1.4.min',
        backbone:'../vendor/backbone-min',
        underscore:'../vendor/underscore-min',
        juicer:'../vendor/juicer-min',
        text:'../vendor/text'
    },

    shim: {
        'backbone':['underscore','jquery']
    }
});
define("/scripts/config.js", function(){});

requirejs(['/scripts/config.js'], function (common) {
    requirejs(['a'], function(a) {
        alert("success get a");
        a.a();
    });

    function index() {
        console.log("you has enter index page");
    }


    index();
});
define("index", function(){});

define('b',[], function () {
    function b() {
        console.log("this is scripts bbbbbbb~~~");
    }


    return {
        b: b
    }
});
define('a',['b'], function (b) {
    alert('success get b');
    b.b();
    function a() {
        console.log("this is scripts a~~~");
    }


    return {
        a: a
    }
});
