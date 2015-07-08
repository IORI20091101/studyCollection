define(['text!tmpl/login.html'], function(loginTmpl) {
    var LoginView = Backbone.View.extend({
        el: $("#content"),
        events: {
            "submit form": "login"
        },
        login: function() {
            $.post('/login', {
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
            this.$el.html(loginTmpl);
        }
    });

    return LoginView;
})