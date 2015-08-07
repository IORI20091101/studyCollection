define([''],function () {
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