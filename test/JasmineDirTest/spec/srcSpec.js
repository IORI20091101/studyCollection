describe("A suite of basic functions", function() {
    it("reverse word dcba", function() {
        expect("DCBA").toEqual(reverse("ABCD"));
    });

    it("reverse word conan", function() {
        expect("Conan").toEqual(reverse("nanoC"));
    });
});