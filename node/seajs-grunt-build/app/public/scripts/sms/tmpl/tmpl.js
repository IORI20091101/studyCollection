define(function (require, exports, module) {
    var tmpl = [
            '<p>进入了sms页面</p>',
            '<a href="/sms/test">进入test</a>'
          ].join('');

    var tmplTest = [
            '<p>进入sms/test页面</p>',
            '<a href="/sms">返回</a>'
          ].join('');
    module.exports = {
        tmpl: tmpl,
        tmplTest: tmplTest
    };
});

