define('scripts/concat/tmpl/tmpl',[''],function () {
    var tmpl = [
            '<p>进入了concat页面</p>',
            '<a href="/concat/test">进入test</a>'
          ].join('');

    var tmplTest = [
            '<p>进入了concat/test页面</p>',
            '<a href="/concat">返回</a>'
          ].join('');
    return {
        tmpl: tmpl,
        tmplTest: tmplTest
    };
});
define('scripts/concat/view/view',['scripts/concat/tmpl/tmpl'], function (tmpl) {
    //console.log(tmpl);
    var concatView = function() {
        //console.log('进入 concat');
        $(".content").html(tmpl.tmpl);
    }

    var concatTestView = function() {
        //console.log('进入 concat test');
        $(".content").html(tmpl.tmplTest);
    }

    return {
        concatView: concatView,
        concatTestView:concatTestView
    }
});
define('scripts/concat/router',['scripts/concat/view/view'],function (concatView) {
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


