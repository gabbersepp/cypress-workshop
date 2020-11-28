
describe("fetch", {baseUrl: null}, () => {
    it("test", () => {
        cy.server();
        cy.route("GET", /.*todo.*/).as("todos");
        cy.visit("./7.fetch.html")
        cy.get("button#test").click().wait("@todos")
    })

    it("test2", () => {
        cy.route2({
            url: /.*/
        }).as("todos");
        cy.visit("./7.fetch.html")
        cy.get("button#test").click().wait("@todos")
    })
});