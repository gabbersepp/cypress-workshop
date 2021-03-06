describe("events", () => {
    function publishAureliaEvent(event, data) {
        cy.window().then(win => win.eventAggregator.publish(event, data));
    }

    // ticket anlegen mit betroffenen kontakt
    it("test", () => {
        cy.login("developer", "Test12");
        cy.visit("/#/ticket/29")
        cy.get(".calling-card").should("contain", "tastatur")
        publishAureliaEvent(`entity:configurationitem:deleted:2`, 2);
        cy.get(".calling-card").should("not.contain", "tastatur")
    })
})