describe("events", () => {
    function setupEventHandler(event) {
        const container = {};
    
        cy.window({ log: false }).then((win) => {
            cy.log("setup eventhandler for: " + event);
            const handler = (args) => {
                win.document.removeEventListener(event, handler);
                container.event = args;
                container.passed = true;
            };
            win.document.addEventListener(event, handler, false);
        });
    
        return container;
    }

    function onTabsChanged() {
        return setupEventHandler("tabsHub:activeTabChanged");
    }

    it("tab change fail", () => {
        cy.login("developer", "test")
        cy.visit("/#/ticket/1").get("#ticketBaseRoot1 ticket-info");
        cy.visit("/#/ticket/2").get("#ticketBaseRoot2 ticket-info");
        
        cy.window().then(win => {
            win.location.replace("https://demo.firstanswer.de/#/ticket/1")
        })

        cy.get("*[data-active='true'] .tab-text").then($e => expect($e.text().indexOf("1") > -1).eq(true))
    })

    it("tab change fix", () => {
        cy.login("developer", "test")
        cy.visit("/#/ticket/1").get("#ticketBaseRoot1 ticket-info");
        cy.visit("/#/ticket/2").get("#ticketBaseRoot2 ticket-info");

        const event = onTabsChanged();

        cy.window().then(win => {
            win.location.replace("https://demo.firstanswer.de/#/ticket/1")
        })
 
        cy.wrap(event).should(c => expect(c.passed).to.eq(true))

        cy.get("*[data-active='true'] .tab-text").then($e => expect($e.text().indexOf("1") > -1).eq(true))
    })
    
})