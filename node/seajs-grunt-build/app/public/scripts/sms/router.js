define(function (require, exports, module) {
  //var $ = require('jquery');
  //var _ = require('underscore');
  //var Backbone = require('backbone');

 var smsView = require('./view/view');

  var smsRouter = window.localRouter.createRouter({
        '/': function() {
            console.log('进入 concat /');
            smsView.smsView();
        },
        '/test': function() {
            console.log('进入 concat /test');
            smsView.smsTestView();
        }
    });

    exports.routeURL = function(path) {
        return window.localRouter.handlePath(path, smsRouter);
    };

});

