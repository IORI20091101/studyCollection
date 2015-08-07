define([
        'SocialNetView',
        'views/chatsession',
        'views/chatitem',
        'text!tmpl/chat.html',
        ],function(
                SocialNetView,
                ChatSessionView,
                ChatItemView,
                chatItemTmpl
            ) {

    var chatView = SocialNetView.extend({
        el:$('#chat'),
        chatSessions: {},
        initialize:function(options) {
            this.socketEvents = options.socketEvents;
            this.collection.on('reset', this.renderCollection, this);
        },
        render:function() {
            this.$el.html(chatItemTmpl);
        },
        startChatSession: function(model){
            var accountId = model.get('accountId');
            if( !this.chatSessions[accountId] ) {
                var chatSessionView = new ChatSessionView({
                    model: model,
                    socketEvents: this.socketEvents
                });
                this.$el.prepend(chatSessionView.render().el);
                this.chatSessions[accountId] = chatSessionView;
            }
        },
        renderCollection: function(collection) {
            var that = this;
            $('.chat_list').empty();
            colection.each(function(contact) {
                var chatItemView = new ChatItemView({
                    socketEvents: that.socketEvents,
                    model: contact
                });
                chatItemView.bind('chat:start', that.startChatSession, that);
                var statusHtml = (chatItemView).render().el;
                $(statusHtml).appendo('.chat_list');
            });
        }
    })

    return chatView;
});