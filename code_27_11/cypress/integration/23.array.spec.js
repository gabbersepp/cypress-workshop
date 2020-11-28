
describe("array", () => {
    function publishAureliaEvent(event, data) {
        cy.window().then(win => win.eventAggregator.publish(event, data));
    }

    function convertTicketItemDates(t) {
        t.creationDate = new Date(t.creationDate.toString());
    }

    function convertTicketDates(t) {
        t.creationDate = new Date(t.creationDate.toString());
        t.lastAccessDate = new Date(t.lastAccessDate.toString());
        t.ticketItems.forEach(convertTicketItemDates);
    }

    it("test", () => {
        cy.fixture("tickets.json").then(tickets => {
            convertTicketDates(tickets[0])
            cy.route2("POST", /.*searchtickets.*/i, req => {
                if (JSON.parse(req.body).myTickets === true) {
                    req.reply(tickets)
                }
            });
            
            cy.route2("GET", /.*LoadTicket.*10049.*/, req => req.reply(tickets[0]))
            cy.visit("http://localhost/Customer").wait(500).pause()
                .then(() => {
                    let ticket = { ...tickets[0] }
                    ticket.ticketItems.push(
                        {
                            "id": 10120,
                            "fromCustomer": false,
                            "userFeedback": false,
                            "description": "Neuer Kommentar",
                            "type": "Comment",
                            "creationDate": new Date("2019-12-09T09:37:04Z"),
                            "files": []
                        }
                    )
                    publishAureliaEvent("ticketChanged", ticket)
                })
        });
    })

    it("test fix", () => {
        cy.fixture("tickets.json").then(tickets => {
            convertTicketDates(tickets[0])
            cy.route2("POST", /.*searchtickets.*/i, req => {
                if (JSON.parse(req.body).myTickets === true) {
                    req.reply(tickets)
                }
            });
            
            cy.route2("GET", /.*LoadTicket.*10049.*/, req => req.reply(tickets[0]))
            cy.visit("http://localhost/Customer")
            .window().then(w => {
                tickets[0].ticketItems = w.Array(...tickets[0].ticketItems)
                tickets[0].ticketItems[0].files = w.Array()
            })
            .wait(500).pause().window()
                .then((w) => {
                    let ticket = { ...tickets[0] }
                    ticket.ticketItems.push(
                        {
                            "id": 10120,
                            "fromCustomer": false,
                            "userFeedback": false,
                            "description": "Neuer Kommentar",
                            "type": "Comment",
                            "creationDate": new Date("2019-12-09T09:37:04Z"),
                            "files": w.Array()
                        }
                    )
                    ticket.lastAccessDate = new Date()
                    publishAureliaEvent("ticketChanged", ticket)
                }).pause()
        });
    })
})