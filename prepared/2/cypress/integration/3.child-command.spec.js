describe("Child command", () => {
    Cypress.Commands.add("doesContain", { prevSubject: "element" }, (subject, options) => {
        cy.wrap(subject).should("contain", options)
    })

    it("test", () => {
        cy.visit("https://google.de").get("body").doesContain("google");
    })
})