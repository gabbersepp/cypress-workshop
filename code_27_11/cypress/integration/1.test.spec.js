/// <reference types="cypress" />

describe("test", () => {
    it("test", () => {
        cy.visit("https://samhammer.de");


        let expected = isEnglish ? "hellO" : "HallO"
        cy.get("body").should("be.visible").click({ force: true })

        
    })
}); 