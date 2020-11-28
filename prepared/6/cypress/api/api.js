

export async function post(url, data) {
    let result = await fetch(url, {
        method: "POST", 
        body: JSON.stringify(data),
        headers: {
            "Authorization": localStorage.getItem("demoreference_access_token"),
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })

    if (result.status == 204) {
        return null;
    }

    return result.json();
}

export async function get(url) {
    let result = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": localStorage.getItem("demoreference_access_token"),
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })

    return result.json();
}

export function getTicket(id) {
    return get("https://demo.firstanswer.de/api/ticket/getTicket?id=" + id)
}

export function getPerson(id) {
    return get("https://demo.firstanswer.de/api/person/getPerson?id=" + id)
}

export async function createTicket(searchstring) {
    let ticket = {
        category: "Reference.Categories.Test",
        description: searchstring,
        entranceType: "Default.DataSources.EntranceTypes.Email",
        language: "Default.DataSources.SupportLanguages.De",
        priority: "Reference.ATD.SLAConfigurations.TicketSLAConfigurationOne.TicketPriorities.Standard",
        reportedBy: {
            personId: 1,
            person: await getPerson(1)
        },
        team: "Reference.Teams.Team1",
        title: searchstring,
        status: "Default.DataSources.TicketStatuses.Open",
        waitingStatus: "Default.DataSources.WaitingStatuses.NotWaiting"
    }

    let ticketSaveModel = {
        activityRecordChanges: [],
        ciModuleChanges: [],
        ciRelationChanges: [],
        filledFields: [],
        ticket: ticket,
        ticketRelationChanges: []
    }

    let tResult = await post("https://demo.firstanswer.de/api/ticket/saveTicket", ticketSaveModel)
    return getTicket(tResult.id);
}

export function ticketPool(searchString) {
    var data = {"textFilter":searchString,"pagination":{"fromIndex":0,"count":10},"filter":[{"filterKey":"status","values":["Default.DataSources.TicketStatuses.Open"]}],"columns":["selection","aggregatedColumn_Ticketinfo","column_ticket_Priority","aggregatedColumn_Sla","aggregatedColumn_Lastprocessing"],"ianaTimeZone":"Europe/Berlin"};
    return post("https://demo.firstanswer.de/api/ticketPool/loadData", data);
}

export function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

export async function repeat(times, timeout, fn) {

    let result = false;
    let count = 0;

    while (count < times && !result) {
        result = await fn();
        if (!result) {
            count++;
            await sleep(timeout);
        }
    }

    if (!result) {
        throw new Error("repeater failed");
    }

    return result;
}

export function waitUntilActionIsProcessed(systemAction, ticketId) {
    function check() {
        return get("https://demo.firstanswer.de/api/AutomaticTestSupport/IsActionProcessed", { systemAction: systemAction, ticketId: ticketId });
    }

    return repeat(400, 250, () => check(this));
}

export function provideMetadata(data, identifier) {
    return post(`http://localhost/HelpdeskApi/AutomaticTestSupport/ProvideCustomMetadata?identifier=${identifier}`, data);
}