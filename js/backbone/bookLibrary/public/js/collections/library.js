/**
 * Created by toshiba on 16/7/23.
 */

var app = app || {};

app.Library = Backbone.Collection.extend({
    model: app.Book
});