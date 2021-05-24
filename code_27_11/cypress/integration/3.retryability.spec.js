
describe("test", () => {
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
})