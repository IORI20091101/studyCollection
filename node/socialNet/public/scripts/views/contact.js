define([
    'SocialNetView',
    'text!tmpl/contact.html'
    ],function(SocialNetView, contactTmpl) {

    var contactView = SocialNetView.extend({
        addButton: false,
        removeButton: false,
        tagName: 'li',
        events: {
            'click .addbutton': 'addContact',
            'click .removebutton': 'removeContact'
        },
        initialize: function() {
            if( this.options.addButton ) {
                this.addButton = this.options.addButton;
            }

            if( this.options.removeButton ) {
                this.removeButton = this.options.removeButton;
            }
        },
        render: function() {
            $(this.el).html(_.template(contactTmpl, {
                model: this.model.toJSON(),
                addButton: this.addButton,
                removeButton: this.removeButton
            }));
            return this;
        },
        addContact: function() {
            var $responseArea = this.$('.actionArea');
            $.post('/accounts/me/contact', {
                contactId: this.model.get('_id')
            }, function onSuccess() {
                $responseArea.text('Contact Added');
            }, function onError() {
                $responseArea.text('Could not add contact');
            })
        },
        removeContact: function(collection) {
            var $responseArea = this.$('.actionArea');
            $responseArea.text('Removing contact...');
            $.ajax({
                url:'/accounts/me/contact',
                type:'DELETE',
                data: {
                    contactId: this.model.get('accountId')
                }
            }).done(function onSuccess() {
                $responseArea.text('Contact Removed');
            }).fail(function onError() {
                $responseArea.text('Could not  Remove contact');
            })
        }
    });
    return contactView;
})