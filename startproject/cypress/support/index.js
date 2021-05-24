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