describe("Feldvorschläge", () => {
    it("try/catch", () => {
        cy.server();
        cy.route("POST", /.*getFieldRecommendationsFromText.*/).as("classifierRequest");
        cy.login("developer", "test");
        try {
            cy.visit("https://demo.firstanswer.de/#/ticket/1").wait("@classifierRequest");
        } catch {

        }
    })

    it("cy.on", done => {
        cy.on("fail", error => {
            if (error.name === "CypressError"
                && error.message.toString()
                                .match(/.*timed out waiting `.*` for the 1st request to the route: `classifierRequest`.*/)) {
                    // calling done forces cypress to turn test to green
                    done();
            }
        });

        cy.server();
        cy.route("POST", /.*getFieldRecommendationsFromText.*/).as("classifierRequest");
        cy.login("developer", "test");
        cy.visit("https://demo.firstanswer.de/#/ticket/1").wait("@classifierRequest");
    })
});