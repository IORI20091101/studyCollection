var ejs = require('ejs');

var template = '<%= movies %>';

var context = {
    movies: [
        'Babi',
        'Babe: Pig in the city',
        'Enter the void'
    ]
}

console.log(ejs.render(template, context));