const { it } = require("mocha")

describe("test", () => {
    it("test", () => {
        cy.login("developer", "Test12")
        cy.visit("/#/ticket/21")
        cy.get("*[id=Title21]").as("title1")
        
    })
})