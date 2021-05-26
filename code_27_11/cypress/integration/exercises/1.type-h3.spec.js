describe("Übung 1", () => {
    it("cy.type", () => {
        cy.visit("https://docs.cypress.io/")
        cy.get('.DocSearch-Button-Placeholder').click();
        cy.get('#docsearch-input').type('cy.type').wait(1000);
        cy.get('.DocSearch-Hit').first().click();
    })

    it("h3", () => {
        cy.visit("https://docs.cypress.io");
        cy.get("h3").then($divs => {
            for(let i = 0; i < $divs.length; i++) {
                expect($divs[i].textContent.length).greaterThan(0)
            }
        })
    })
})