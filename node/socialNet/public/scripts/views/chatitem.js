define(['SocialNetView', 'text!tmpl/chatitem.html'], function(SocialNetView, chatItemTmpl) {
    var chatItemView = SocialNetView.extend({
        tagName: 'li',
        $el: $(this.el),
        events: {
            'click':'startChatSession'
        },
        initialize: function(options) {
            var accountId = this.model.get('accountId');
            options.socketEvents.bind(
                'login:' + accountId,
                this.handleContactLogin,
                this
            );

            options.socketEvents.bind(
                'logout:' + accountId,
                this.handleContactLogout,
                this
            );

            options.socketEvents.bind(
                'socket:chat:start:' + accountId,
                this.startChatSession,
                this
            );
        },
        handleContactLogin: function() {
            this.model.set('online',true);
            this.$el.find('.online_indicator').addClass('online');
        },
        handleContactLogout: function() {
            this.model.set('online', false);
            $onlineIndicator = this.$el.find('.online_indicator');

            while( $onlineIndicator.hasClass('online') ) {
                $onlineIndicator.removeClass('online');
            }
        },
        startChatSession: function() {
            this.trigger('chat:start', this.model);
        },
        render: function() {
            this.$el.html(_.template(chatItemTmpl, {
                model: this.model.toJSON()
            }));
            return this;
        }
    });
    return chatItemView;
})