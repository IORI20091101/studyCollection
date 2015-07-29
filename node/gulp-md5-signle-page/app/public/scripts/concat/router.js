define(['./view/view'],function (concatView) {
  //var $ = require('jquery');
  //var _ = require('underscore');
  //var Backbone = require('backbone');



  var concatRouter = window.localRouter.createRouter({
        '/': function() {
            console.log('进入 concat /');
            concatView.concatView();
        },
        '/test': function() {
            console.log('进入 concat /test');
            concatView.concatTestView();
        }
    });

    return function (path) {
        return window.localRouter.handlePath(path, concatRouter);
    };

});

