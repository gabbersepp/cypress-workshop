describe("Cypress und der State zwischen Tests", () => {

    it("Cypress bereinigt state zwischen tests", () => {
        localStorage.setItem("blabla", "wurst");
    })

    it("deshalb ist der localstorage leer", () => {
        expect(localStorage.getItem("blabla")).to.be.null;
    })

    it("aber Cypress bereinigt nicht die App", () => {
        cy.get("body").then($b => {
            const div = document.createElement("div");
            div.id = "newitem";
            div.textContent = "test content";
            $b.append(div);
        })
    })

    it("wie man sieht", () => {
        cy.get("#newitem").should("contain", "test content");
    })

    it("das führt zu problemen -> nur schnell die App öffnen", () => {
        cy.login("developer", "test");
        cy.newTicket();
        cy.newTicket();
        cy.newTicket();
    })

    // hier bereinigt Cypress localStorage, Cookies, ....

    it("und nochmal", () => cy.login("developer", "test"))

    // wie fixen? kA, liegt teils auch am AUT Code
})