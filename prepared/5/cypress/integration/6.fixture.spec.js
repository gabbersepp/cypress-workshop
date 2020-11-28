
describe("Fixture", () => {
    it("test", () => {
        cy.server();
        cy.route("GET", /.*GetLastEditedTickets.*/, "fixture:test.json");
        cy.login("developer", "test");
    })

    it("test2", () => {
        cy.fixture("test.json");
        cy.route("fixture:test.json")
    })
});