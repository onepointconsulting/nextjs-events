import Layout from '../../components/layout'
import Head from 'next/head'
import Date from "../../components/date";
import {getAllEventIds, getEventData} from "../../lib/events";
import utilStyles from "../../styles/utils.module.css";

export default function Event({eventData}) {
    return (
        <Layout>
            <Head>
                <title>{eventData.name}</title>
            </Head>
            <h3 className={utilStyles.headingXl}>{eventData.name}</h3>
            <br />
            <Date dateString={eventData.startTimestamp} timezone={eventData.timezone} />
            <br />
            <div dangerouslySetInnerHTML={{ __html: eventData.description }} />
        </Layout>
    )
}

export async function getStaticPaths() {
    const ids = await getAllEventIds();
    console.log('eventIds', ids);
    return {
        paths: ids,
        fallback: false
    }
}

export async function getStaticProps({params}) {
    const eventData = await getEventData(params.id);
    console.log('eventData', eventData);
    return {
        props: {
            eventData: eventData.length > 0 ? eventData[0] : []
        }
    }
}

