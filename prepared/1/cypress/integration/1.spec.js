describe("Weitere Eigenschaften", () => {
    beforeEach(() => {
        cy.visit("/#/login");
        cy.get("#usernameinput").type("developer");
        cy.get("#passwordinput").type("test");
        cy.get("#loginbutton").click();
        cy.get(".add-tab-btn").should("exist");
    })

    it("Cypress ist asynchron", () => {
        let $element = null;
        cy.get(".add-tab-btn").then($e => $element = $e);
        expect($element).not.null;
    });

    it("Cypress ist asynchron: richtig", () => {
        let $element = null;
        cy.get(".add-tab-btn")
            .then($e => $element = $e)
            .then(() => expect($element).not.null)
    });

    it("Auf Promises wird gewartet", () => {
        const promise = new Promise(resolve => setTimeout(() => resolve("fertig"), 5000))
        cy.then({ timeout: 10000 }, () => promise)
            .then(result => expect(result).to.eq("fertig"))  
    })

    it("Debuggen am einfachsten per Statement", () => {
        cy.get("body").then($body => {
            // am besten auch mit 'debugger' statement im client code arbeiten, falls dort gedebuggt werden muss
            debugger;
        })
    })

    it("Cypress ist nicht awaitable", async () => {
        const body = await cy.get("body");
        const text = body.text();
        // "funktioniert"
        expect(text).contain("Ticket");
        
        // aber was ist damit:
        cy.get("#globalsearch input").type("test");
        const result = await cy.get(".container.search-results .contact-name");
        // schlägt fehl
        expect(result.length).greaterThan(0);
    })

    it("Cypress hat implizite assertions", () => {
        cy.get("#blabla").should("not.exist");
    })

    it("nicht alles ist repeatable", () => {
        let i = 0;
        cy.get("body").then($e => {
            console.log(i++);
            expect(i).to.eq(2);
        });
    });

    it("nicht alles ist repeatable - fix", () => {
        let i = 0;
        cy.get("body").should($e => {
            console.log(i++);
            expect(i).to.eq(2);
        });
    })
    
    it("should kann verwirrend sein", () => {
        cy.get("#blabla").should(() => {
            cy.get("#blabla").should(() => {
                expect(true).to.eq(true)
                // https://github.com/cypress-io/cypress/issues/5963
            })
        })
    })

    it("should + command = vorsicht", () => {
        cy.get("body").should($body => {
            cy.log("blabla")
            debugger;
            expect($body.text()).to.contain("blablabla");
        })
    })
})