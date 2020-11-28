
describe("test", () => {
    it("", () => {
        cy.login("developer", "test")
        cy.newTicket()
        cy.get("#Categoryn0").click();
    })
})