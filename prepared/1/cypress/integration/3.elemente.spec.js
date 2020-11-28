describe("test", () => {
    it("test", () => {
        cy.visit("https://devopenspace.de/")
            .get("nav").contains("WORKSHOPS").click()

        cy.get(".workshops").should("have.length.greaterThan", 10)
            .last()
            .should("contain", "Scrum für Product Owner")
    })
})