describe("Its", () => {
    it("repeatable", () => {
        var obj = {
            get test() {
                console.log("retry");
                return 1;
            }
        }
        cy.wrap(obj).its("test").should("eq", 2);
    })
})