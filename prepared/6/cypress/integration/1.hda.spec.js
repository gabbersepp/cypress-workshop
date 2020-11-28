describe("HDA", () => {
    it("navigation items must be clickable", () => {
        //cy.login("developer", "test");
        cy.visit("https://demo.firstanswer.de/Admin");

        // the first header will be empty because initially there is no header
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
    });
})