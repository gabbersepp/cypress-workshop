/// <reference types="cypress" />

describe("test", () => {
    it("test", () => {
        cy.task("cwd").then(cwd => {
            Cypress.log({
                displayName: "CWD",
                message: "cwd ist " + cwd,
                consoleProps: () => ({
                    cwd
                })
            })
        })
    })
})