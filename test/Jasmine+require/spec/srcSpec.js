define(['src','a'], function(src) {
    console.log(src);
    describe("A suite of basic functions", function() {
        it("reverse word dcba", function() {
            expect("DCBA").toEqual(src.reverse("ABCD"));
        });

        it("reverse word conan", function() {
            expect("Conan").toEqual(src.reverse("nanoC"));
        });
    });
});

