define(['backbone','jquery','scripts/core/router'],function (backbone, jquery, localRouter) {
  //var $ = require('jquery');
  //var _ = require('underscore');
  //var Backbone = require('backbone');
  window.localRouter = localRouter;

  var MainRouter = Backbone.Router.extend({
      routes: {
        "":                     "start",
        "concat*path":          "concat",
        "sms*path":             "sms",
        "search/:query":        "search",
        "search/:query/p:page": "search"
      },

      start: function() {
        $(".content").html([
            '<p>进入了index页面</p>',
            '<a href="/concat" >进入CONCAT</a>|||<a href="/sms">进入SMS</a>',
          ].join(''));
      },
      sms: function(path) {

         requirejs(['/scripts/sms/router.js'], function( smsRouter ) {
                smsRouter( path );
            });
      },
      concat: function(path) {
         requirejs(['/scripts/concat/router.js'], function( concatRouter ) {
                concatRouter( path );
            });
      }

  });

  window.mainRouter = new MainRouter();


  console.log('enter init');
    $(function(){
        Backbone.history.start( { pushState : true, root : "/" } );
    });


});

