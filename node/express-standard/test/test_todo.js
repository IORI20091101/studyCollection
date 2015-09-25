/**
 * Created by toshiba on 15/9/24.
 */
var assert = require('assert');

var Todo = require("./todo");

var todo = new Todo();

var testsCompleted = 0;

function deleteTest() {
    todo.add("delete me!");
    assert.equal(todo.getCount(), 1 ,"1 item should exists");
    todo.deleteAll();
    assert.equal(todo.getCount(), 0 ,"no item should exists");
    testsCompleted++;
}


function addTest() {
    todo.deleteAll();
    todo.add("added");
    assert.notEqual(todo.getCount(), 0, "1 item should exists");
    testsCompleted++;
}


function doAsyncTest(cb) {
    todo.doAsync(function(value) {
        assert.ok(value, "Callback should be passed true");
        testsCompleted++;
        cb();
    });
}


function throwsTest(cb) {
    assert.throws(todo.add, "requires");
    testsCompleted++;
}

deleteTest();
addTest();
throwsTest();
doAsyncTest(function() {
    console.log("complete " + testsCompleted + " tests");
});



//sudo npm install -g nodeunit