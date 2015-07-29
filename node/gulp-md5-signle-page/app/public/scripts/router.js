define(['backbone','jquery','core/router'],function (backbone, jquery, localRouter) {
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

         requirejs( ['sms/router'], function( smsRouter ) {
                smsRouter( path );
            });
      },
      concat: function(path) {
         requirejs( ['concat/router'], function( concatRouter ) {
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

