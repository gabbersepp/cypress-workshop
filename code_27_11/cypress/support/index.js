let token;

Cypress.Commands.add("token", () => token);

Cypress.Commands.add("login", (username, pw) => {
    function loginViaFetch(user, pw) {
        const formData = new URLSearchParams();
        formData.append("client_id", "local-test-hd");
        formData.append("grant_type", "password");
        formData.append("password", pw);
        formData.append("username", user);
        
        return fetch("http://biehler-josef.de:9500/api/token", {
            method: "POST",
            body: formData
        })
    }

    function saveToken(data) {
        const { access_token, refresh_token, expires_in } = data;
        token = access_token;
        const expiry = new Date().getTime() + parseInt(expires_in * 1000);
        window.localStorage.setItem("hd_auth_token", JSON.stringify({
            accessToken: access_token,
            refreshToken: refresh_token,
            expiryTime: expiry,
            clientId: "local-test-hd"
        }));
    }

    return cy.then(() => loginViaFetch(username, pw))
        .then(result => result.json())
        .then(result => {
            saveToken(result);
            cy.visit("/")
        })
})

Cypress.Commands.add("newTicket", () => {
    cy.location().then(loc => {
        cy.get("#shellnewticket").click().get("body").click();
        cy.location().should(loc2 => expect(loc.hash).not.eq(loc2.hash))
        .then(loc2 => {
            const identifier = loc2.hash.match(/.*(n[0-9]+)/)[1];
            return identifier;
        })
    })
 });

 Cypress.Commands.add("newTicket3", () => {
    cy.location().its("hash").as("loc");
    cy.get("#shellnewticket").click();
    cy.location().should(function(loc2) {
        expect(this.loc).not.eq(loc2.hash);
    }).then(loc2 => {
        const identifier = loc2.hash.match(/.*(n[0-9]+)/)[1];
        return identifier;
    })
 });