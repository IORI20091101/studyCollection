/**
 * Created by sundongzhi on 16/7/25.
 */


var app = app || {};

app.BookItemView = Backbone.View.extend({
    el: '#books',

    template: Handlebars.compile( $('#bookItemTemplate').html() ),

    initialize: function(opts) {

        this.modelId = opts.modelId;

        app.getLibrary(this.render, this);

    },
    events: {
        'click #add': "addBook"
    },
    render: function(books, self) {
        console.log(books.models);

        var flag = false
        _.each(books.models, function(item) {
            if( item.toJSON().id ==  self.modelId) {
                flag = true
                this.$el.html( this.template.compile(model.toJSON()) );
            }
        });

        if( !flag ) {
            alert("id 错误");
        }



    },


});