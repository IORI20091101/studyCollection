define([
    'SocialNetView',
    'text!tmpl/chatsession.html'
    ], function(SocialNetView, chatSessionTmpl) {

    var chatItemView = SocialNetView.extend({
        tagName: 'div',
        className:'chat_session',
        $el: $(this.el),
        events: {
            'submit form':'sendChat'
        },

        initialize: function(options) {
            var accountId = this.model.get('accountId');
            this.socketEvents = options.socketEvents;
            this.socketEvents.on('socket:chat:in:' + accountId,
                    this.receiveChat,
                    this
            );
            this.socketEvents.bind(
                'login:'+accountId,
                this.handleContactLogin,
                this
            );
            this.socketEvents.bind(
                'logout:'+ accountId,
                this.handleContactLogout,
                this
            )
        },
        handleContactLogin: function() {
            this.$el.find('.online_indicator').addClass('online');
            this.model.set('online', true);
        },
        handleContactLogout: function() {
            this.model.set('online', false);
            $onlineIndicator = this.$el.find('.online_indicator');
            while( $onlineIndicator.hasClass('online') ) {
                $onlineIndicator.removeClass('online');
            }
        },
        receiveChat: function(data) {
            var chatLine = this.model.get('name').first+ ' : ' + data.text;
            this.$el.find('.chat_log').append($('<li>'+ chatLine +'</li>'));
        },

        sendChat: function() {
            var chatText = this.$el.find('input[name=chat]').val();
            if( chatText && /[^\s]+/.test(chatText) ) {
                var chatLine = 'Me: ' + chatText;
                this.$el.find('.chat_log').append($('<li>'+ chatLine +'</li>'));
                this.socketEvents.trigger('socket:chat', {
                    to: this.model.get('accountId'),
                    text: chatText
                })
            }
            return false;
        },

        render: function() {
            this.$el.html(_.template(chatItemTmpl, {
                model: this.model.toJSON()
            }));
            return this;
        }
    })

    return chatItemView;
})