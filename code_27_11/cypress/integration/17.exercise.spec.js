describe("test", () => {
    it("asa", () => {
        cy.route2(/.*main\.js.*/, req => {
            req.reply(res => {
                debugger
                return res
            })
        })
        
        cy.login("developer", "test")
    })
})