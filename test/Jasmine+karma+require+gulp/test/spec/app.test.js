
define(['app'],function(app) {
    'use strict';
    describe("require test", function() {
        it("测试app.js  add方法", function() {
            expect(app.add(1,2)).toEqual(3);
        });
    });

});