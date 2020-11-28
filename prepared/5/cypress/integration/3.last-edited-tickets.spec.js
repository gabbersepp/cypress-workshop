describe("Last edited tickets", () => {
    beforeEach(() => {
        const d = new Date();
        d.setHours(d.getHours()-15);
    
        cy.server();
        cy.route("GET", /.*GetLastEditedTickets.*/, [
            {
                lastActionDate: d.toISOString(),
                ticket: {
                    id: 1234,
                    title: "test ticket",
                    category: "test kategorie"
                }
            }
        ])
        loginThroughAPI();
    });
    
    it("should show date string", () => {
        const dateSr = "Letzter Zugriff vor etwa 15 Stunden";
        cy.get(".last-edited-tickets-list").should("contain", dateSr);
    });
})