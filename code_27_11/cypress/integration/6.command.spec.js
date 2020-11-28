
describe("test", () => {
    const randomFn = (options = {}) =>  {
        const resolve = () => {
            return Cypress.Promise.try(() => {
                const z = Math.ceil(Math.random() * 10);
                Cypress.log({
                    name: 'RandomFn',
                    displayName: 'RandomFn',
                    message: `value: ${z}`,
                    consoleProps: () => {
                        return {
                            "test": z
                        }
                    }
                })
                return z;
            }).then(value => {
                return cy.verifyUpcomingAssertions(value, options, {
                    onRetry: resolve
                })
            })
        }

        return resolve()
    }

    Cypress.Commands.add("random", randomFn)

    it("test", () => {
        cy.log("käse")
        cy.random().debug().should(z => {
            expect(z).to.eq(2)
        })
    })

    it("asd", () => {
        cy.log("test")
        cy.log("**test**")
        cy.log("_test_")
        cy.log("[blue](test)")
    })

    Cypress.Commands.add("doesContain", { prevSubject: "element" }, (subject, options) => {
        debugger;
        cy.wrap(subject).should("contain", options)
    })
    
    it.only("test", () => {
        cy.visit("https://google.de").get("body").doesContain("google");
    })
})