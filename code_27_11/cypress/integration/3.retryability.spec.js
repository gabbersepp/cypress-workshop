
describe("test", () => {
    it("should + command = vorsicht", () => {
        const promise = new Promise(resolve => {
            setTimeout(() => resolve("true"), 1000);
        })

        cy.then(() => promise).should("contain", "true")

    })
})