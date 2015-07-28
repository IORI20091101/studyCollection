define(function (require, exports, module) {
  //var $ = require('jquery');
  //var _ = require('underscore');
  //var Backbone = require('backbone');

  var concatView = require('./view/view');
  //console.log(concatView);

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

    exports.routeURL = function(path) {
        return window.localRouter.handlePath(path, concatRouter);
    };

});

