define([
    'SocialNetView',
    'text!tmpl/index.html',
    'views/status',
    'modles/Status'
    ], function(SocialNetView,indexTmpl, StatusView, Status) {

        var indexView = SocialNetView.extend({
            el: $('#content'),
            events: {
                "Submit form": "updateStatus"
            },
            initialize: function() {
                this.collection.on('add', this.onStatusAdded, this);
                this.collection.on('reset', this.onStatusCollectionReset, this);
            },
            onStatusCollectionReset:function(collection) {
                var that = this;
                collection.each(function(model) {
                    that.onStatusAdded(model);
                });
            },
            onStatusAdded:function(status) {
                var statusHtml = (new StatusView({model: status})).render().el;
                $(statusHtml).prependTo('.status_list').hide().fadeIn('slow');
            },
            updateStatus:function() {
                var statusText = $('input[name=status]').val();
                var statusCollection = this.collection;

                $.post('/accounts/me/status', {
                    status: statusText
                }, function(data) {
                    statusCollection.add(new Status({status: statusText}));
                })

                return false;
            },
            render: function() {
                this.$el.html(indexTmpl);
            }
        });

        return indexView;
});