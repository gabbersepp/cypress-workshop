describe("test", () => {
    it("test", () => {
        cy.visit("https://docs.cypress.io")
            .get("#search-input").type("cy.type").pause()
            
            //cy.get("div.ds-suggestion").first().click()
    })
})