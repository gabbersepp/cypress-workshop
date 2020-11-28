
describe("sd", () => {
    it("ads", () => {
        cy.task("doesFileExist", { path: "C:\\git\\firstaidapp\\Sources\\FirstAIDApp\\FirstAIDApp.WebApi\\Controllers\\Api\\TestSupport\\AutomaticTestSupportController.cs"})
            .then(result => {
                expect(result).eq(true)
            })
    })
})