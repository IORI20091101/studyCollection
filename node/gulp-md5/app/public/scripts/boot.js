require.config({
    baseUrl:'/static/scripts/',
    paths:{
        jQuery: 'libs/jquery-2.1.4.min',
        Backbone:'libs/backbone-min',
        Underscore:'libs/underscore-min',
        juicer:'libs/juicer-min',
        text:'libs/text'
    },

    shim: {
        'Backbone':['Underscore','jQuery'],
        'index':['Backbone']
    }
});

require(['index'], function(index) {
    index();
});


