define([
    'SocialNetView',
    'views/contact',
    'text!tmpl/contacts.html'
    ],function(SocialNetView, ContactView, contactsTmpl) {

    var contactsView = SocialNetView.extend({
        el: $('#content'),
        initialize: function() {
            this.collection.on('reset', this.renderCollection, this);
        },
        render: function() {
            this.$el.html(contactsTmpl);
        },
        renderCollection: function(collection) {
            collection.each(function(contact) {
                var statusHtml = (new ContactView({
                    removeButton: true, model:contact
                })).render().el;

                $(statusHtml).appendTo('.contacts_list');
            });
        }
    });
    return contactsView;
})