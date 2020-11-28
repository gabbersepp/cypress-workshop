
describe("taskqueue", () => {
    function waitForTaskQuue() {
        const randomFieldName = new Date().getTime().toString();
        cy.window().then(win => win.aureliaTaskQueue.queueTask(() => win[randomFieldName] = true));
        cy.window().should(win => expect(win[randomFieldName]).to.equal(true));
    }

    it("test", () => {
        cy.server()
        cy.route("POST", /.*loadData.*/i).as("loadData");

        //cy.login("developer", "test")
        //cy.visit("https://demo.firstanswer.de/#/pool/count=100")
        cy.visit("https://devtest.firstanswer.de/Test/Core/Helpdesk/#/pool/count=100")
        cy.wait("@loadData", {timeout: 50000}).then(r => {
            cy.get("tr.header-row input-check-box-component .cbx-container").click().wait(50).then(() => waitForTaskQuue())
            cy.get(".generic-table-row img[src*='CheckBox_Yes']")
            .then($items => expect($items.length).eq(r.responseBody.items.length))
        })     
       
    })
})