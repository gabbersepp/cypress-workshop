describe("Login besser", () => {
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

    it("mit cy.request", () => {
        cy.request({
            body: {
                client_id: "HD",
                grant_type: "password",
                password: btoa(""),
                username: "developer"
            },
            form: true,
            method: "POST",
            url: "https://demo.firstanswer.de/api/token"
        }).then(data => {
            saveToken(data.body);
        }).then(() => {
            cy.visit("/");
            cy.get(".add-tab-btn").should("exist");
        })
    })

    it("mit fetch() bzw beliebiger lib", () => {
        cy.then(() => loginViaFetch("developer", ""))
            .then((response) => {
                return response.json();
            })
            .then(data => {
                saveToken(data);
                cy.visit("/");
                cy.get(".add-tab-btn").should("exist");
            })
    })
})