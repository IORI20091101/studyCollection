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
        'click #update': "updateBook"
    },
    render: function(books, self) {
        console.log(books.models);

        var flag = false
        _.each(books.models, function(item) {
            if( item.id ==  self.modelId) {
                self.model = item;
                flag = true;
                self.$el.html( self.template(item.toJSON()) );
            }
        });

        if( !flag ) {
            alert("id 错误");
        }



    },
    updateBook: function(e) {
        e.preventDefault();
        var formData = {};
        var self = this;
        $('#addBook div').children('input').each( function( i, el ) {
            if( $(el).val() != "" ) {
                formData[ el.id ] = $( el).val();
            }
        } );


        _.each(formData, function(v, k) {
            console.log('k:' + k + ' v: ' + v);
            self.model.set(k+"", v);
        })

        self.model.save({success: function() {
        }});
        app.MainRouter.navigate('/main', {trigger: true});

    }


});