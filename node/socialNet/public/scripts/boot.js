require.config({
    paths:{
        jQuery: '/scripts/libs/jquery-2.1.4.min',
        Underscore:'/scripts/libs/underscore',
        juicer:'/scripts/libs/juicer-min',
        Backbone:'/scripts/libs/backbone',
        text:'/scripts/libs/text',
        tmpl:'/scripts/tmpl',
        Sockets:'/socket.io/socket.io',
        models:'models',
        SocialNetView:'/scripts/SocialNetView'
    },

    shim: {
        'Backbone':['Underscore','jQuery'],
        'SocialNet':['Backbone']
    }
});

require(['SocialNet'], function(SocialNet) {
    SocialNet.initialize();
})