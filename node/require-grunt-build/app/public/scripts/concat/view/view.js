define(['scripts/concat/tmpl/tmpl'], function (tmpl) {
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