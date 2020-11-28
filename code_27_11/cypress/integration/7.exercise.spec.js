
describe("test", () => {
    it("test", () => {
        cy.login("developer", "test")
            .get("#service_TicketsPool").should("exist")
    })
})