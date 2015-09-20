var Entry = require('../models/Entry');


module.exports = function(perpage) {
    perpage = perpage || 10;

    return function(req, res, next) {
        var page = Math.max(parseInt(req.query.page),1);

        if( isNaN(page) ) {
            page = 1;
        }
console.log(req.query);
console.log(111);
console.log(page);
        Entry.count(function(total) {

            req.page = res.locals.page = {
                number: page,
                perpage: perpage,
                from: (page - 1)* perpage,
                to: page* perpage - 1,
                total: total,
                count: Math.ceil(total / perpage)
            }

            next();

        });

    }
}