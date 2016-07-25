/**
 * Created by toshiba on 16/7/23.
 */
var app = app || {};

app.Book = Backbone.Model.extend({
    defaults: {
        coverImage: "img/placeholder.png",
        title: "No title",
        author: "Unknown",
        releaseDate: "Unknown",
        keywords: "None"
    },

    urlRoot: function() {
      return '/api/books'
    },

    idAttribute: '_id',

    validate: function(attrs, options) {
        if( !attrs.title || _.isEmpty(attrs.title) ) {
            return "title 不能为空"
        }

        if( !attrs.author || _.isEmpty(attrs.author) ) {
            return "author 不能为空"
        }

        if( !attrs.keywords || _.isEmpty(attrs.keywords) ) {
            return "keywords 不能为空"
        }

        if( !attrs.releaseDate || _.isEmpty(attrs.releaseDate) ) {
            return "releaseDate 不能为空"
        }
    }
});

