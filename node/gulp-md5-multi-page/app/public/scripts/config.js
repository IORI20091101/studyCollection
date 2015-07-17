require.config({
    baseUrl:'/static/scripts',
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
