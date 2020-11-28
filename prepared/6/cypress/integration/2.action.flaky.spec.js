
const { createTicket, ticketPool } = require("../api/api");
const { openSelect2 } = require("../support/Select2Helper");

describe("IsNewInTeam", () => {
    it("test", () => {
        let ticket;
        cy.login("developer", "test")
            .then(async () => ticket = await createTicket("test"))
            .then(() =>cy.visit("/#/ticket/" + ticket.id))
            .then(() => {
                cy.get("#actionButton_views\\.Ticket\\.ActionButtons\\.StopEditing").click();
                cy.get("*[id*=stopProcessing_changeTeamTicketAction]").click();
                openSelect2("*[data-ui-locator*=teamwidget] div.select2-container", "1st Level Support");
                cy.get("*[id*=changeTeamInvolvingAction]").choicesSelect("Ticket abschließen")
                cy.get("*[id*=changeTeamInvolvingAction] .label.with-clear").should("contain", "Ticket abschließen");
                cy.get("#actionButton_views\\.Ticket\\.ActionButtons\\.SaveChangeTeam").click();
            })
            .then(() => ticketPool(ticket.title))
            .then(d => {
                let isNewInTeam = d.items.find(x => x.id == ticket.id).data["aggregatedColumn_Ticketinfo"].isNewInTeam;
                expect(isNewInTeam).eq(true)
            });
    })
});