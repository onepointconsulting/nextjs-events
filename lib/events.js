import fetch from 'node-fetch';

export async function getEvents() {
    return fetchEventList({orgId: 2, eventTypeIds: "1,2,3,4,5"});
}

async function fetchEventList(params) {
    const {orgId, eventTypeIds} = params;
    const orgIdStr = Array.isArray(orgId) ? orgId.join(",") : orgId;
    const targetUrl = `https://events.brahmakumaris.org/bkregistration/organisationEventReportController.do?orgEventTemplate=jsonEventExport.ftl&orgId=${orgIdStr}&eventTypeIds=${eventTypeIds}&fromIndex=0&toIndex=10000&mimeType=application/json`;
    const response = await fetch(targetUrl);
    const json = await response.json();
    return json.response;
}

export async function getEventData(id) {
    const eventData = await getEvents();
    return eventData.data.filter(e => e.id === parseInt(id));
}

export async function getAllEventIds() {
    const eventData = await getEvents();
    return eventData.data.map(e => {
        return {params: {id: e.id.toString()}}
    });
}