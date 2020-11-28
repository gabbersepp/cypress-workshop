
describe("cdp", () => {
    it("test", () => {
        cy.visit("https://wiki.selfhtml.org/wiki/CSS/Tutorials/Print-CSS").pause()
        .then(() => cy.task("activatePrintMediaQuery").pause().task("resetCRI").pause())
    })
})