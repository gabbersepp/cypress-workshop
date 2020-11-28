
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

 const randomFn = (options = {}) => {
    const resolveValue = () => {
        return Cypress.Promise.try(() => Math.seek(Math.random() * 10)).then(value => {
            return cy.verifyUpcomingAssertions(value, options, {
                onRetry: resolveValue
            })
        })
     }
    return resolveValue()   
 }

 Cypress.Commands.add("random", randomFn)