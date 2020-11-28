describe("Neues Ticket", () => {
    it("test", () => {
        cy.login("developer", "test");
        cy.newTicket().then(id => {
            cy.log(`id: ${id}`);
        }).pause()
    })
})