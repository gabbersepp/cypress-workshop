Cypress.Commands.add("login", (username, pw) => {
    function loginViaFetch(user, pw) {
        const formData = new URLSearchParams();
        formData.append("client_id", "HD");
        formData.append("grant_type", "password");
        formData.append("password", btoa(pw));
        formData.append("username", user);
        
        return fetch("https://demo.firstanswer.de/api/token", {
            method: "POST",
            body: formData
        })
    }

    function saveToken(data) {
        const { access_token, refresh_token } = data;
        const expiry = new Date(data[".expires"]).getTime().toString();
        window.localStorage.setItem("demoreference_access_token", access_token);
        window.localStorage.setItem("demoreference_refresh_token", refresh_token);
        window.localStorage.setItem("demoreference_access_token_expiry_date", expiry);
    }

    return cy.then(() => loginViaFetch(username, pw))
        .then(result => {
            return result.json();
        }).then(result => {
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