require.config({
    baseUrl:'/',
    paths:{
        jquery: 'vender/jquery-2.1.4.min',
        backbone:'vender/backbone-min',
        underscore:'vender/underscore-min',
        juicer:'vender/juicer-min',
        text:'vender/text',
        config: 'scripts/config'
    },

    shim: {
        'backbone':['underscore','jquery'],
        'index':['config']
    }
});
