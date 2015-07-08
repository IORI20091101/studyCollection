define(['text!tmpl/register.html'], function(registerTmpl) {
    var RegisterView = Backbone.View.extend({
        el: $("#content"),
        events: {
            "submit form": "register"
        },
        register: function() {
            $.post('/register', {

            }, function(data) {
                console.log(data);
            })
            return false;
        },
        render: function() {
            this.$el.html(registerTmpl);
        }
    });

    return RegisterView;
})