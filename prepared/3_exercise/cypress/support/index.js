/// <reference types="cypress" />

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

Cypress.Commands.add("login", (user, password) => {
    cy.then(() => loginViaFetch(user, password))
    .then((response) => {
        return response.json();
    })
    .then(data => {
        saveToken(data);
        cy.visit("/");
        cy.get(".add-tab-btn").should("exist");
    })
 })

 Cypress.Commands.add("newTicket", () => {
    cy.location().then(loc => {
        cy.get("#shellnewticket").click().get("body").click();;
        cy.location().should(loc2 => expect(loc.hash).not.eq(loc2.hash)).then(loc2 => {
            const identifier = loc2.hash.match(/.*(n[0-9]+)/)[1];
            return identifier;
        })
    })
 });

 Cypress.Commands.add("newTicket2", () => {
    cy.get("#shellnewticket").click().click();;
    cy.location().then(loc2 => {
        const identifier = loc2.hash.match(/.*(n[0-9]+)/)[1];
        return identifier;
    })
 });
