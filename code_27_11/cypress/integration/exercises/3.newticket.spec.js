Cypress.Commands.add("newTicket2", function() {
    cy.location().its("hash").as("hash_old")
    cy.get("#shellnewticket").click();
    cy.location().then(loc2 => {
        if (loc2 === this.hash_old) {
            Cypress.log({
                displayName: "BlaBla",
                message: "hashes sind gleich"
            })
            throw new Error()
        }
        Cypress.log({
            displayName: "BlaBla",
            message: `Hash alt: ${this.hash_old}, neu: ${loc2.hash}`
        })
        const identifier = loc2.hash.match(/.*(n[0-9]+)/)[1];
        return identifier;
    })
 });


describe("test", () => {
    it("", () => {
        cy.login("developer", "Test12")
        cy.visit("/#/ticket/1")
        cy.newTicket2().then(id => {
            Cypress.log({
                displayName: "Ticket",
                message: "TicketId is " + id
            })
        })
    })
})