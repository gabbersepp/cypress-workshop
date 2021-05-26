/// <reference types="cypress" />

function provideMetadata(data, identifier) {
    return cy.token().then(t => {
        return cy.request({
            method: "POST",
            url: `http://biehler-josef.de:9500/api/AutomaticTestSupport/ProvideCustomMetadata?identifier=${identifier}`,
            headers: {
                "Authorization": "Bearer " + t,
                "X-Auth-ClientId": "local-test-hd"
            },
            body: data
        })
    });
}

describe("Involving Actions", () => {
    it("test", () => {
        cy.login("developer", "Test12");
        provideMetadata({
            allColumns: [],
            involvingActions: [
                {
                    key: "ChangeTeamAction",
                    name: "ChangeTeamAction",
                    items: [
                        { 
                            name: "käse",
                            key: "käse"
                        }
                    ]
                }
            ]
        }, "actions")
        .intercept("GET", /.*GetAllInvolvingActions.*/i, r => {
            r.headers["x-hd-test-identifier"] = "actions"
        })
        .visit("http://biehler-josef.de:9500/HD/#/ticket/1")

        cy.get("#actionButton_views\\.Ticket\\.ActionButtons\\.StopEditing").click();
        cy.get("*[id*=stopProcessing_changeTeamTicketAction]").click();

        cy.get("*[data-ui-locator*=reasonWidget] .label").should("contain", "käse");
    })
})