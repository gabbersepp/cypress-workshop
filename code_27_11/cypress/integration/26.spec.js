/// <reference types="cypress" />

describe("Last edited tickets", () => {
    it("cy.on", () => {
        cy.login("developer", "Test12");
        cy.visit("http://biehler-josef.de:9500/HDA");

        let header = "dummy value";

        cy.get("#mainSideBar li:has(a):not(:has(.fa-external-link))").each($e => {
            const link = cy.wrap($e);
            link.click();
            const $subMenu = $e.find("li");

            if ($subMenu.length > 0) {
                cy.wrap($subMenu).should("be.visible");
            } else {
                cy.get(".container-fluid.page-heading").should($header => {
                    const headerText = $header.text();
                    expect(headerText).not.equal(header);
                    expect(headerText.length).greaterThan(1);
                    header = headerText;
                });
            }
        });
    })
})