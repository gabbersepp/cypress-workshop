describe("events", () => {
    function publishAureliaEvent(event, data) {
        cy.window().then(win => win.eventAggregator.publish(event, data));
    }

    // ticket anlegen mit betroffenen kontakt
    it("test", () => {
        cy.login("developer", "test");
        cy.visit("/#/ticket/29")
        cy.get(".calling-card").should("contain", "ci")
        publishAureliaEvent(`entity:configurationitem:deleted:9`, 9);
        cy.get(".calling-card").should("not.contain", "ci")
    })
})