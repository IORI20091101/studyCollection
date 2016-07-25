/**
 * Created by sundongzhi on 16/7/25.
 */
app.Router = Backbone.Router.extend({

    routes: {
        '' : 'home',
        'main': 'initView',
        'main/books/:id': "bookItem"
    },

    home: function() {
        this.navigate( '/main', { trigger : true } );
    },

    initView: function() {
        new app.LibraryView();
    },

    bookItem: function(id) {
        console.log(id);
        new app.BookItemView({modelId: id})
    }

})