/**
 * Created by toshiba on 16/7/23.
 */

var app = app || {};

app.Library = Backbone.Collection.extend({
    model: app.Book,
    
    url: "/api/books",

    initialize: function() {

        var self = this;
        this.fetch({success: function(res) {
            self.trigger("dataReady");

        }});
    }
});


app.getLibrary = function( callback , ctx) {
    if( !app.Books ) {
        app.Books = new app.Library();

        app.Books.on("dataReady", function() {
            if( callback && _.isFunction(callback) ) {
                callback(app.Books, ctx);
            }
        })

    } else {
        if( callback && _.isFunction(callback) ) {
            callback(app.Books, ctx);

        }
    }

    return app.Books;

}


