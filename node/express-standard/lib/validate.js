
function getField(req, field) {
    var val = req.body;

    return val[field];
}

exports.required = function(field) {

    return function(req, res, next) {
        console.log(req);
        if( getField(req, field) ) {
            next();
        } else {
            res.error(field.join(' ') + ' is required!');
            res.redirect('/');
        }
    }
}

exports.lengthAbove = function(field, len) {

    return function(req, res, next) {
        if( getField(req, field).length >= len ) {

            next();
        } else {
            res.error(field.join(' ') + ' must have more than ' + len + ' characters');
            res.redirect('/');
        }
    }
}