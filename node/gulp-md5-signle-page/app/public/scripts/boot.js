requirejs.config({
    baseUrl:'/scripts/',
    paths:{
        jquery: '../vendor/jquery',
        backbone:'../vendor/backbone',
        underscore:'../vendor/underscore'
    },

    shim: {
        'backbone':['underscore','jquery']
    }
});

requirejs(['router'], function() {});


