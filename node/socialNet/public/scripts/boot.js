require.config({
    paths:{
        jQuery: '/static/scripts/libs/jquery-2.1.4.min',
        Underscore:'/static/scripts/libs/underscore',
        juicer:'/static/scripts/libs/juicer-min',
        Backbone:'/static/scripts/libs/backbone',
        text:'/static/scripts/libs/text',
        tmpl:'/static/scripts/libs/tmpl',
        Sockets:'/socket.io/socket.io'
    },

    shim: {
        'Backbone':['Underscore','jQuery'],
        'SocialNet':['Backbone']
    }
});

require(['SocialNet'], function(SocialNet) {
    SocialNet.initialize();
})