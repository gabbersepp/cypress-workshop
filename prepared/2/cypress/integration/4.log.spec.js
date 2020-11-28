
describe("log", () => {
    it("test", () => {
        cy.wrap({ test: 1 }).should(obj => {
            cy.log("test")
            expect(obj.test).eq(1)
        })
    })

    it("test2", () => {
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

    it("format", () => {
        cy.log("test")
        cy.log("**test**")
        cy.log("_test_")
        cy.log("[blue](test)")
    })
})