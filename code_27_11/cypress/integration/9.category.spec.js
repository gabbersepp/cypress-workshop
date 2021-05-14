
describe("test", () => {
    it("", () => {
        cy.login("developer", "Test12")
        cy.newTicket()
        cy.get("#Categoryn0").click();
    })
})