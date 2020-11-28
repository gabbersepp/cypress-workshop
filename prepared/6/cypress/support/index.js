/// <reference types="cypress" />

const { setToken } = require("../api/api");

function loginViaFetch(user, pw, host) {
    const formData = new URLSearchParams();
    formData.append("client_id", "HD");
    formData.append("grant_type", "password");
    formData.append("password", btoa(pw));
    formData.append("username", user);
    
    host = host || "https://demo.firstanswer.de/api/";

    return fetch(host + "token", {
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

Cypress.Commands.add("login", (user, password, host, url) => {
    cy.then(() => loginViaFetch(user, password, host))
    .then((response) => {
        return response.json();
    })
    .then(data => {
        saveToken(data);
        cy.visit(url || "/");
        cy.get(".add-tab-btn").should("exist");
    })
 })

 Cypress.Commands.add("newTicket", () => {
    cy.location().its("hash").as("loc");
    cy.get("#shellnewticket").click().get("body").click();
    cy.location().should(function(loc2) {
        expect(this.loc).not.eq(loc2.hash);
    }).then(loc2 => {
        const identifier = loc2.hash.match(/.*(n[0-9]+)/)[1];
        return identifier;
    })
 });

 Cypress.Commands.add("choicesSelect", { prevSubject: "element" }, (subject, searchString) => {
    cy.wrap(subject).click({ force: true })
        .find("input").type(searchString, { force: true })
        .wait(200);
    return cy.wrap(subject).find(".choices__list--dropdown .choices__item--selectable:not(.choices__placeholder)")
        .first()
        .click({ force: true });
 })