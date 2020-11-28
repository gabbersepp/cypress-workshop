
const { createTicket, ticketPool, waitUntilActionIsProcessed } = require("../api/api");
const { openSelect2 } = require("../support/Select2Helper");

describe("IsNewInTeam", () => {
    it("test", () => {
        let ticket;
        cy.login("developer", "test")
            .then(async () => ticket = await createTicket("test"))
            .then(() =>cy.visit("/#/ticket/" + ticket.id))
            .then(() => {
                cy.server()
                cy.route("GET", /.*ticketactions.*/i).as("buttons");
                cy.wait("@buttons.2");
                cy.get("#actionButton_views\\.Ticket\\.ActionButtons\\.StopEditing").click({ force: true });
                cy.get("*[id*=stopProcessing_changeTeamTicketAction]").click({ force: true });

                openSelect2("*[ui-locator*=teamwidget] div.select2-container", "Team 2");
                
                cy.get("*[id*=changeTeamInvolvingAction]").choicesSelect("Übernahme durch anderes Team/Division")
                cy.get("*[id*=changeTeamInvolvingAction] .label.with-clear").should("contain", "Übernahme durch anderes Team/Division");
                cy.get("#actionButton_views\\.Ticket\\.ActionButtons\\.SaveChangeTeam").click();
            })
            .then(() => waitUntilActionIsProcessed("Default.SystemActionTypes.Ticket.TeamChanged", ticket.id))
            .then(() => ticketPool(ticket.title))
            .then(d => {
                let isNewInTeam = d.items.find(x => x.id == ticket.id).data["aggregatedColumn_Ticketinfo"].isNewInTeam;
                expect(isNewInTeam).eq(true)
            });
    })
});