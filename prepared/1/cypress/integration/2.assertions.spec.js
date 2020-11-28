/// <reference types="cypress" />

describe("assertions", () => {
    it("test", () => {
        cy.wrap({ test: 1 }).should("have.any.keys", "test")
    })

    it("test2", () => {
        cy.wrap({ test: 1 }).should("have.any.keys", "test")
            .and("not.have.any.keys", "blabla")

    })
});