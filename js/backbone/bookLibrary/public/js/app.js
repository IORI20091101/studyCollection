/**
 * Created by toshiba on 16/7/23.
 */
var app = app || {};

$(function() {
    var books = [
        {title:"javascript the good part", author: 'Douglas Crockford', releaseDate: '2008', keywords: 'javascript programming'},
        {title:"javascript the good part", author: 'Douglas Crockford', releaseDate: '2008', keywords: 'javascript programming'},
        {title:"javascript the good part", author: 'Douglas Crockford', releaseDate: '2008', keywords: 'javascript programming'},
        {title:"javascript the good part", author: 'Douglas Crockford', releaseDate: '2008', keywords: 'javascript programming'},
    ];

    app.MainRouter = new app.Router();
    Backbone.history.start({pushState: true, root: '/'});
})