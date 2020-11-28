describe("Übung 1", () => {
    it("Amazon", () => {
        cy.visit("https://amazon.de");
        cy.get("#twotabsearchtextbox").type("lenovo{enter}");
        cy.get("*[data-component-type='s-search-result']").its("length").should("be.above", 1)
    });
})