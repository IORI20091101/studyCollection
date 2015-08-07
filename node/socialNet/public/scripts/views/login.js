define(['SocialNetView','text!tmpl/login.html'], function(SocialNetView,loginTmpl) {
    var LoginView = SocialNetView.extend({
        requireLogin: false,
        el: $("#content"),
        events: {
            "submit form": "login"
        },
        initialize: function(options) {
            this.socketEvents = options.socketEvents;
        },
        login: function() {

            var socketEvents = this.socketEvents;
            $.post('/login', this.$('form').serialize(), function(data) {
                console.log(data);
                socketEvents.trigger('app:loggedin',data);
                window.location.hash ='index';
            }).error(function() {
                $("#error").text("Unable to login.").slideDown();
                return false;
            });
            return false;
        },
        render: function() {
            this.$el.html(loginTmpl);
            $('#error').hide();
            $('input[name=email]').focus();
        }
    });

    return LoginView;
})