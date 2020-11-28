

/*cy.location().then(loc => {
    loc.hash
})

// #shellnewticket


Cypress.Commands.add("xxx", (options) => {
    
})


cy.xxx().then(id => {
    // id = n0
})*/

Cypress.Commands.add("newTicket2", () => {
    cy.get("#shellnewticket").click();
    cy.location().then(loc2 => {
        const identifier = loc2.hash.match(/.*(n[0-9]+)/)[1];
        return identifier;
    })
 });


describe("test", () => {
    it("", () => {
        cy.login("developer", "test")
        cy.visit("/#/ticket/28")
        cy.newTicket().then(id => {
            debugger;
        })
    })
})