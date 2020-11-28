import { openSelect2 } from "./../support/Select2Helper";

describe("Kategorie", () => {
    it("test", () => {
        cy.login("developer", "test");
        cy.newTicket().then(id => {
            openSelect2("#Categoryn0 div.select2-container", "Buchhaltung");
        })
    })
})