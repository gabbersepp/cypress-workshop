describe("should", () => {
    it("test", () => {
        cy.login("developer", "Test12")
        cy.visit("http://biehler-josef.de:9500/HD/#/person/5");
        cy.get("div").contains("Neues System Feld 1").parent().find("input-check-box-component").wait(500)
        .then($e => {
            debugger;
            if ($e.find("img[src*='CheckBox_No']").length > 0) {
                cy.wrap($e).click();
            } else if ($e.find("img[src*='CheckBox_Yes']").length > 0) {
                // do nothing                
            }
        })
    })
})