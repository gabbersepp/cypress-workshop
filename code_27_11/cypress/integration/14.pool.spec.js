
describe("Ticket pool", () => {
    it("should show correct tickets if filter changed", () => {
        const response = {
            moreItemsAvailable: false,
            totalRowCount: 1
        }
        const tOpen = {
            type: "Ticket",
            selected: false,
            id: "1",
            data: {
                aggregatedColumn_Ticketinfo: {
                    id: 1,
                    title: "Ticket status offen",
                    waitingStatus: "Default.DataSources.WaitingStatuses.NotWaiting",
                    waitingReason: null,
                    waitingStatusUntil: null,
                    creationDate: "2020-11-11T12:22:05Z",
                    status: "Default.DataSources.TicketStatuses.Open",
                    category: "Test.Categories.Additional",
                    assignedToId: null,
                    assignedTo: null,
                    email: null,
                    reportedBy: {
                        person: {
                            firstName: "Testuser",
                            lastName: "Samhammer",
                            companyName: null
                        },
                        company: null
                    },
                    ticketInfoIcon: "User",
                    ticketInfoIconTooltip: "userIconTicket",
                    reminderProcessActive: false,
                    reminder: {
                        reminderKey: null,
                        currentReminderStep: 0,
                        totalReminderSteps: 0
                    },
                    isNewInTeam: false,
                    slaInfo: {
                        isEscalated: true,
                        escalationInfoTooltip: "someSlasEscalated",
                        runningSLAs: 5,
                        escalatedSLAs: 2
                    },
                    isSubscribed: false
                },
                column_ticket_Priority: "Test.ATD.SLAConfigurations.TicketSLAConfigurationOne.TicketPriorities.PremiumYachtService",
                aggregatedColumn_Sla: {
                    slaRemainingTime: 586083959.1136,
                    slaEndingDate: "2020-11-19T12:24:33Z",
                    slaTranslationKey: "Test.ATD.SLACriteria.CompleteTime",
                    slaIsOverdue: false
                },
                aggregatedColumn_Lastprocessing: {
                    assigneeName: "Testuser Samhammer",
                    date: "2020-11-12T14:35:53Z",
                    action: null
                }
            }
        }
        const tInprocessing = {
            type: "Ticket",
            selected: false,
            id: "2",
            data: {
                ...tOpen.data,
                aggregatedColumn_Ticketinfo: {
                    ...tOpen.data.aggregatedColumn_Ticketinfo,
                    id: 2,
                    title: "ticket in bearbeitung",
                    assignedToId: 20,
                    assignedTo: "Josef Biehler",
                }
            }
        }
        cy.route2("POST", /.*loaddata.*/i, req => {
            const data = JSON.parse(req.body);
            const filter = data.filter[0];
            debugger;
            if (filter && filter.filterKey === "status" && filter.values.indexOf("Default.DataSources.TicketStatuses.Open") >= 0) {
                req.reply({...response, items: [tOpen]})
            } else if (filter && filter.filterKey === "processingStatus" && filter.values.indexOf("inProcessing") >= 0) {
                req.reply({...response, items: [tInprocessing]})
            } else {
                req.reply({
                    moreItemsAvailable: false,
                    totalRowCount: 0
                })
            }
        }).as("loaddata");

        cy.login("developer", "test").then(() => cy.visit("https://demo.firstanswer.de/#/pool/"));
        // initialer aufruf -> status offen
        cy.wait("@loaddata");
        cy.get("#ticketPoolResultTable").should("contain", "Ticket status offen");
        cy.get("#ticketPoolResultTable .generic-table-row").its("length").should("eq", 1);

        // remove status filter
        cy.get(".clear-multiselect abbr").click().wait("@loaddata");
        // add processing filter
        cy.get("#processingStatusFilter .choices").click()
            .get(".choices__list").contains("In Bearbeitung").click();

        cy.get("#ticketPoolResultTable").should("contain", "ticket in bearbeitung");
        cy.get("#ticketPoolResultTable .generic-table-row").its("length").should("eq", 1);    
    });

    it.only("wait mit alias", () => {
        cy.server();
        cy.route("POST", /.*loadData.*/).as("loadData");
        cy.login("developer", "test")
        cy.visit("https://demo.firstanswer.de/#/pool/")
        cy.get("#generic-pool-result-view .refresh").click()
        cy.wait("@loadData.2").then(response => {
            debugger;
        });
    })
})