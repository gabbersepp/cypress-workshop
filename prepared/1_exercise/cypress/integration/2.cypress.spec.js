/// <reference types="cypress" />

describe("Cypress", () => {
    it("test", () => {
        cy.visit("https://docs.cypress.io/")
            .get("#search-input")
            .type("cy.type")
        cy.get(".ds-dropdown-menu div.ds-suggestion").first().click()
    })
})