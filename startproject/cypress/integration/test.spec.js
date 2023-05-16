/// <reference types="cypress" />

describe("test", () => {
    it("test", () => {
        cy.visit("https://google.de");
        cy.get("body").then().should("contain", "Samhammer");
    })
}); 