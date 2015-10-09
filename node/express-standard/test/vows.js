//不好用 不去了解
/*var vows = require('vows');

var assert = require('assert');
var Todo = require('./todo');

vows.describe('Todo').addBatch({  //批次
    'when adding an item': {      //情境
        topic: function() {       //主题
            var todo = new Todo();
            todo.add('Feed my cat');
            return todo;
        },
        'it should exist in my todos': function(err, todo) { //誓约
            assert.equal(todo.getCount(), 1);
        }
    }
}).run();*/