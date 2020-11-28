/// <reference types="cypress" />


describe("test", () => {
    it("tests", async () => {
        cy.visit("https://google.de")

        cy.get("form[action*='search'] input[type='text']").type("biehler-josef.de");
        const result = await cy.get("*[class*='__suggestions-inner-container']");
        // schlägt fehl
        expect(result.length).greaterThan(0);
    })
})