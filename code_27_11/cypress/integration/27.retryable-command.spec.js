describe("Custom command", () => {     
    const randomFn = (options = {}) => {
        const resolveValue = () => {
            return Cypress.Promise.try(() => {
                const z = Math.ceil(Math.random() * 10);
                Cypress.log({
                    name: 'RandomFn',
                    displayName: 'RandomFn',
                    message: `Value: ${z}`,
                    consoleProps: () => {
                      return {
                          devopenspace: `ist cool ${z}`
                      }
                    }
                  })
                  return z;
            }).then(value => {
                return cy.verifyUpcomingAssertions(value, options, {
                    onRetry: resolveValue
                })
            })
        }
        return resolveValue()   
    }

    Cypress.Commands.add("random", randomFn)

    it("test", () => {
        cy.random().should(z => {
            expect(z).to.eq(2);
        })
    })
})