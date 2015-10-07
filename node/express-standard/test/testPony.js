exports.testPony = function(test) {

    //test.expect(2);
    if( false ) {
        test.ok(false, "This should not have passed.");
    }
    test.ok(true, "this is not a pony");

    test.done();
};

exports.testPony1 = function(test) {
     /*var count = 0;
     if( false ) {
     test.ok(false, "This should not have passed.");
     count++;

     }
     test.ok(true, "this is not a pony");
     count++;

     test.equal(count, 2, 'Not all assertions triggered!');
     test.done();
*/
    test.ok(true, "this is not a pony");
    test.done();
}

var Todo = require('./todo');
var todo = new Todo();
exports.testPony2 = function(test) {
    todo.doAsync(function(value) {
        test.ok(value, "value should be true");
        test.done();

    })
}

