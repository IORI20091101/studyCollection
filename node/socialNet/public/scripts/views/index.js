define([
    'SocialNetView',
    'text!tmpl/index.html',
    'views/status',
    'models/Status'
    ], function(SocialNetView,indexTmpl, StatusView, Status) {

        var indexView = SocialNetView.extend({
            el: $('#content'),
            events: {
                "Submit form": "updateStatus"
            },
            initialize: function(options) {
                options.socketEvents.bind('status:me', this.onSocketStatusAdd, this);
                this.collection.on('add', this.onStatusAdded, this);
                this.collection.on('reset', this.onStatusCollectionReset, this);
            },
            onStatusCollectionReset:function(collection) {
                var that = this;
                collection.each(function(model) {
                    that.onStatusAdded(model);
                });
            },
            onSocketStatusAdd: function(data) {
                var newStatus = data.data;
                var found = false;
                this.collection.forEach(function(status) {
                    var name = status.get('name');
                    if( name && name.full == newStatus.name.full && status.get('status') == newStatus.status ) {
                        found = true;
                    }
                });

                if( !found ) {
                    this.collection.add(new Status({status: newStatus.status, name: newStatus.name}))
                }
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