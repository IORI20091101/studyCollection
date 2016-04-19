define('scripts/sms/tmpl/tmpl',[],function () {
    var tmpl = [
            '<p>进入了sms页面</p>',
            '<a href="/sms/test">进入test</a>'
          ].join('');

    var tmplTest = [
            '<p>进入sms/test页面</p>',
            '<a href="/sms">返回</a>'
          ].join('');
    return {
        tmpl: tmpl,
        tmplTest: tmplTest
    };
});


define('scripts/sms/view/view',['scripts/sms/tmpl/tmpl'], function (tmpl) {

    //console.log(tmpl);


    var smsView = function() {
        //console.log('进入 concat');
        $(".content").html(tmpl.tmpl);
    }

    var smsTestView = function() {
        //console.log('进入 concat test');
        $(".content").html(tmpl.tmplTest);
    }

    return {
        smsView: smsView,
        smsTestView: smsTestView
    }
});
define('scripts/sms/router',['scripts/sms/view/view'], function (smsView) {
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


