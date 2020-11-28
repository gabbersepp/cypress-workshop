
describe("test", () => {
    it("", () => {
        const d = new Date();
        d.setHours(d.getHours()-15);

        cy.server();

        cy.route("GET", /.*getlasteditedtickets.*/i, "fixture:")

        cy.login("developer", "test")

        const dateStr = "Letzter Zugriff vor etwa 15 Stunden";
        cy.get(".last-edited-tickets-list").should("contain", dateStr)
    })
})