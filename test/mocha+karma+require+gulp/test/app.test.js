
define(['app'],function(app) {
    'use strict';
    describe("require test", function() {
        it("测试app.js  add方法", function() {
            expect(app.add(1,2)).to.be.equal(3);


        });
    });

    describe("闲的蛋疼的测试",function() {
        it("fff", function() {
            expect(4 + 5).to.be.equal(9);
            expect(4 + 5).to.be.not.equal(10);
        })
    })

});