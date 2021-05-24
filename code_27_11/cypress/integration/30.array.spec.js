/// <reference types="cypress" />

describe("test", () => {
    beforeEach(() => {
        Cypress.$("body").append(`
        <script>
        document.querySelector("body").arrayObject = [1,2,3]
        </script>
        `)
    })

    it("test", () => {
        const array = Cypress.$("body")[0].arrayObject;
        cy.window().then(win => {
            assert.isTrue(array instanceof win.Array)
        })
    })

    it("test 2", () => {
        const array = Cypress.$("body")[0].arrayObject;
        assert.isTrue(array instanceof Array);
    })
})