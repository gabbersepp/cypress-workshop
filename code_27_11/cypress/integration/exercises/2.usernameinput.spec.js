describe("HD", () => {
    it("should be loaded", () => {
        cy.visit("/");
        cy.get("#usernameinput").should($e => {
            if ($e.length === 0) {
                Cypress.log({
                    name: 'Element noch nicht da',
                    displayName: 'Element noch nicht da',
                    message: `Element noch nicht da`,
                });
                throw new Error();
            }

            Cypress.log({
                name: 'Element da',
                displayName: 'Element da',
                message: `Element da`,
                consoleProps: () => ({
                    placeholder: $e[0].placeholder
                })
            });

            expect($e.attr("type")).to.eq("text")
        });
    })
})