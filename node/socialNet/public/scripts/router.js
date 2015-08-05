define([
    'views/index',
    'views/register',
    'views/login',
    'views/forgotpassword',
    'views/profile',
    'views/contacts',
    'views/addcontact',
    'models/Account',
    'models/StatusCollection',
    'models/ContactCollection'
    ], function(IndexView,
        RegisterView,
        LoginView,
        ForgotPasswordView,
        ProfileView,
        ContactView,
        AddContactView,
        Account,
        StatusCollection,
        ContactCollection) {

    var SocialRouter = Backbone.Router.extend({
        currentView: null,
        socketEvents: _.extend({}, Backbone.Events),
        routes:{
            "index": "index",
            "login":"login",
            "register":"register",
            "forgotpassword":"forgotpassword",
            "profile/:id":"profile",
            "addcontact": "addcontact",
            "contacts/:id": "contacts"
        },
        addcontact: function() {
            this.changeView(new AddContactView());
        },
        contacts: function() {
            var contactId = id? id: 'me';
            var contactCollection = new ContactCollection();
            contactsCollection.url = '/accounts/' + contactId+'/contacts';

            this.changeView(new ContactsView({
                collection: contactsCollection
            }));
            contactsCollection.fetch();
        },
        changeView: function(view) {
            if( null != this.currentView ) {
                this.currentView.undelegateEvents();
            }
            this.currentView = view;
            this.currentView.render();
        },
        index: function() {
            var statusCollection = new StatusCollection();
            statusCollection.url = "/accounts/me/activity";
            this.changeView(new IndexView({
                collection: statusCollection
            }));
            statusCollection.fetch();
        },
        login: function() {
            this.changeView(new LoginView({
                socketEvents: this.socketEvents
            }));
        },
        forgotpassword: function() {
            this.changeView(new ForgotPasswordView());
        },
        register: function() {
            this.changeView(new RegisterView());
        },
        profile: function(id) {
            var model = new Account({id: id});
            this.changeView(new ProfileView({model: model, socketEvents: this.socketEvents}));
            model.fetch();
        }
    })

    return new SocialRouter();
});