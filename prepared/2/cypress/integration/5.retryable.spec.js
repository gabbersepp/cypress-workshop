
describe("retryable", () => {
    it("test", () => {
        cy.get("#wurst").should($e => {
            console.log("retry")
            // $e.length == 0
            var div = document.createElement("div");
            div.id = "wurst";
            Cypress.$("body").append(div);
            expect($e.length).to.be.greaterThan(0)
        })
    })

    it("should + command = böse", () => {
        cy.get("body").should($body => {
            debugger;
            cy.get("div")
        })
    })
})