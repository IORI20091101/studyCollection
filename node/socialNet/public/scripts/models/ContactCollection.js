define(['models/Contact'],function(Contact) {
    var ContactCollection = Backbone.collection.extend({
        model: Contact
    });

    return ContactCollection;
})