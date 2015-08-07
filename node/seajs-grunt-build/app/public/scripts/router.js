define(function (require, exports, module) {
  //var $ = require('jquery');
  //var _ = require('underscore');
  //var Backbone = require('backbone');
  window.localRouter = require('./core/router');

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

         require.async( '/scripts/sms/router', function( smsRouter ) {
                smsRouter.routeURL( path );
            });
      },
      concat: function(path) {
         require.async( '/scripts/concat/router', function( concatRouter ) {
                concatRouter.routeURL( path );
            });
      }

  });

  window.mainRouter = new MainRouter();


  console.log('enter init');
    $(function(){
        Backbone.history.start( { pushState : true, root : "/" } );
    });


});

