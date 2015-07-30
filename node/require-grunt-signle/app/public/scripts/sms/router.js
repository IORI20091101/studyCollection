define(['scripts/sms/view/view'], function (smsView) {
  //var $ = require('jquery');
  //var _ = require('underscore');
  //var Backbone = require('backbone');


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

    return function (path) {
        return window.localRouter.handlePath(path, smsRouter);
    };

});

