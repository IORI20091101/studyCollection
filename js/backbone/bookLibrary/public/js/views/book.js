/**
 * Created by toshiba on 16/7/23.
 */
var app = app || {};

app.BookView = Backbone.View.extend({

    tagName: 'div',

    className: "bookContainer",

    template: Handlebars.compile( $('#bookTemplate').html() ),

    events: {
        'click .delete': 'deleteBook', 
        'click .update': 'clickItem'
    },

    render: function() {
        this.$el.html( this.template(this.model.toJSON()) );
        return this;
    },

    deleteBook: function() {
        var self = this;
        console.log(this.model);
        this.model.destroy({success: function(model, response) {
            console.log(response);
            if(response.code == 200) {
                self.remove();
            } else {
                alert("删除失败,请稍后重试!");
            }
        }});
    },

    clickItem: function(e) {
        var id = this.model.id;
console.log(id);
        if( id ) {
            app.MainRouter.navigate("main/books/" + id,  {trigger: true});
        } else {
            alert('id not exist!')
        }
    }
});