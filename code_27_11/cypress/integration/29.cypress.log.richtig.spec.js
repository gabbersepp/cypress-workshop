describe("test", () => {
    it("test", () => {
        cy.wrap({ test: 1 }).should(obj => {
            Cypress.log({
                name: 'test',
                displayName: 'test',
                message: `test`,
                consoleProps: () => {
                return {
                    test: 1
                    }
                }
            })
            expect(obj.test).eq(1)
        })
    })
})