/// <reference types="cypress" />

describe("test", () => {
    it("test", () => {
        cy.login("developer", "Test12");
        cy.intercept("GET", /.*getTicket.*/i, req => {
            req.continue(interceptor => {
                interceptor.body.title = "Spartakiade";
            })
        })
        cy.visit("/#/ticket/1")
            .get("#Title1 input").should("have.value", "Spartakiade")
    })
})