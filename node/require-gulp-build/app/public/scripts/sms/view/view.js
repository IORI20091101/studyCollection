define(['scripts/sms/tmpl/tmpl'], function (tmpl) {

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