const { provideMetadata, createTicket } = require("../api/api");

export function provideMetadata(data, identifier) {
    return post(`http://localhost/HelpdeskApi/AutomaticTestSupport/ProvideCustomMetadata?identifier=${identifier}`, data);
}

describe("Involving Actions", () => {
    it("test", () => {
        cy.login("developer", "test", "http://localhost/HelpdeskApi/",  "http://localhost/HelpdeskApp/");
        cy.then(() => provideMetadata({
            involvingActions: [
                {
                    key: "ChangeTeamAction",
                    name: "ChangeTeamAction",
                    items: [
                        { 
                            name: "käse"
                        }
                    ]
                }
            ]
        }, "actions"))
        
        cy.route2("GET", /.*GetAllInvolvingActions.*/i, r => {
            r.headers["x-hd-test-identifier"] = "actions"
        }).as("involvingactions")
        .then(t => cy.visit("http://localhost/HelpdeskApp//#/ticket/1"))

        cy.get("#actionButton_views\\.Ticket\\.ActionButtons\\.StopEditing").click();
        cy.get("*[id*=stopProcessing_changeTeamTicketAction]").click();

        cy.get("*[data-ui-locator*=reasonWidget] .label").should("contain", "käse");
    })
})