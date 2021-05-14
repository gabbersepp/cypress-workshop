
describe("test", () => {
    it("test", () => {
        cy.login("developer", "Test12")
            .get("#service_TicketsPool").should("exist")
    })
})