/**
 * Created by toshiba on 16/7/23.
 */
var app = app || {};

app.LibraryView = Backbone.View.extend({
    el: '#books',

    initialize: function() {
        var self = this;

        app.getLibrary(this.render, self);

        // this.listenTo(this.collection, 'add', this.renderBook());

        // this.listenTo(app.collection, 'add', this.addOneBook);
        //
        // this.listenTo(app.collection, 'reset', this.addAllBook);
        //
        // this.listenTo(app.collection, 'all', this.render);
    },
    events: {
      'click #add': "addBook"
    },
    render: function(books, self) {
        self.collection = books;
        _.each(self.collection.models, function( item ) {
            self.renderBook( item );
        });
    },

    renderBook: function( item ) {
        var bookView = new app.BookView({
            model: item
        });
        this.$el.append( bookView.render().el );
    },

    addBook: function( e ) {
        e.preventDefault();

        var self = this;
        var formData = {};

        $('#addBook div').children('input').each( function( i, el ) {
            if( $(el).val() != "" ) {
                formData[ el.id ] = $( el).val();
            }
        } );

        var book = new app.Book( formData );

        book.save({success: function() {
            self.addOneBook( book );
        }});

    },

    addOneBook: function( book ) {
        var self = this;
        self.collection.add( book );
        self.renderBook( book );
    },

    addAllBook: function() {

    }
});