requirejs.config({
        baseUrl:'/',
        paths:{
            jquery: '/vendor/jquery',
            backbone:'/vendor/backbone',
            underscore:'/vendor/underscore'
        },

        shim: {
            'backbone':['underscore','jquery']
        }
    });


requirejs(['scripts/router'], function() {});




