
describe("task", () => {
    it("test", () => {
        cy.task("doesFileExist", { path: "C:\\Users\\jbiehler\\test.txt" }).then(r => expect(r).eq(true));
    })
})