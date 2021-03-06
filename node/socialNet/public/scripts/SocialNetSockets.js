define(['Sockets','models/ContactCollection', 'views/chat'], function(sio, ContactCollection, ChatView) {
    var SocialNetSockets = function(eventDispatcher) {
        var socket = null;
        var accountId = null;
        var connectSocket = function() {
            accountId = socketAccountId;
            socket = io.connect();
            socket.on('connect_failed', function(reason) {
                console.error('unable to connect', reason);
            }).on('connect', function() {
                console.info('successfully established a connection');
                eventDispatcher.on('socket:chat',sendChat);
                socket.on('chatserver', function(data) {
                    eventDispatcher.trigger('socket:chat:start:' + data.from);
                    eventDispatcher.trigger('scoket:chat:in:' + data.from, data);
                });


                socket.on('contactEvent', handleContactEvent);

                var contactCollection = new ContactCollection();
                contactCollection.url='/accounts/me/contacts';
                new ChatView({
                    collection: contactsCollection,
                    socketEvents: eventDispatcher
                }).render();
                contactCollection.fetch();
            });
        }


        var handleContactEvent = function(eventObj) {
            var eventName = eventObj.action+ ':' + eventObj.from;
            eventDispatcher.trigger(eventName, eventObj);

            if( eventObj.from == accountId ) {
                eventName = eventObj.action+ ':me';
                eventDispatcher.trigger(eventName, eventObj);
            }
        }
        var sendChat = function(payload){
            if( null != socket ) {
                socket.emit('chatclient', payload);
            }
        }

        eventDispatcher.bind('app:loggedin', connectSocket);
    }




    return {
        initialize: function(eventDispatcher) {
            SocialNetSockets(eventDispatcher);
        }
    }
});