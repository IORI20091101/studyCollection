define(['text!tmpl/forgotpassword.html'], function(forgotpasswordTmpl) {
    var ForgotPasswordView = Backbone.View.extend({
        el: $("#content"),
        events: {
            "submit form": "passwrod"
        },
        passwrod: function() {
            $.post('/forgotpassword', {
                email:$('input[name=email]').val(),
                password:$('input[name=password]').val()
            }, function(data) {
                console.log(data);
            }).error(function() {
                $("#error").text("Unable to login.").slideDown();
                return false;
            });
            return false;
        },
        render: function() {
            this.$el.html(forgotpasswordTmpl);
        }
    });

    return ForgotPasswordView;
})