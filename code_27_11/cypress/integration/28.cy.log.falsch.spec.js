describe("test", () => {
    it("test", () => {
        cy.wrap({ test: 1 }).should(obj => {
            cy.log("test")
            expect(obj.test).eq(1)
        })
    })
})