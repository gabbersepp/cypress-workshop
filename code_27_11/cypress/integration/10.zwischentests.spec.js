
describe("test", () => {
    it("", () => {
        localStorage.setItem("blabla", "wurest");
    })

    it("", () => {
        expect(localStorage.getItem("blabla")).to.be.null
    })

    it("", () => {
        cy.get("body").then($b => {
            const div = document.createElement("div");
            div.id = "blabla";
            $b.append(div);
        })
    })  

    it("", () => {
        cy.get("#blabla").should("not.exist")
    })

    it.only("", () => {
        cy.login("developer", "test")
        cy.newTicket();
        cy.newTicket();
        cy.newTicket();
        
    })

    
    it.only("", () => {
        cy.reload().login("developer", "test")
    })
})