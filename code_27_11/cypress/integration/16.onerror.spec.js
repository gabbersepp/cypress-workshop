const { expect } = require("chai");

describe("test", () => {
    it("asd", (done) => {
        cy.on("fail", error => {
            if(error.name === "CypressError") {
                if (error.message.toString().indexOf("Timed out retrying") > -1) {
                    done();
                }
            }
        })

        cy.server()
        cy.route("POST", /.*getFieldRecommendationsFromText.*/)
        .as("classifierRequest")       

        cy.login("developer", "test")
        cy.visit("https://demo.firstanswer.de/#/ticket/28")
        cy.wait("@classifierRequest")

        cy.get("bsdfsadfsdfsd").should("not.exist")

    })

})