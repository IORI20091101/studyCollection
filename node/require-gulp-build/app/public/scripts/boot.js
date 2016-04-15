requirejs.config({
        baseUrl:'/',
        paths:{
            jquery: 'vendor/jquery-2.1.4',
            backbone:'vendor/backbone',
            underscore:'vendor/underscore'
        },

        shim: {
            'backbone':['underscore','jquery']
        }
    });


requirejs(['scripts/router'], function() {});




