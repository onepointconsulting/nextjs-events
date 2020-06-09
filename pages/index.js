import Head from 'next/head'
import Layout, {siteTitle} from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import {getEvents} from "../lib/events";
import moment from "moment-timezone";
import Link from "next/link";

export default function Home({allEvents}) {
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={utilStyles.headingMd}>
                {/*<p>Events in Global Co-operation House</p>*/}
            </section>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <ul className={utilStyles.list}>
                    {allEvents.data.map(({id, name, description, startTimestamp}) => (
                        <li className={utilStyles.listItem} key={id}>
                            <Link href="/events/[id]" as={`/events/${id}`}>
                                <a className={utilStyles.headingXl}>{name}</a>
                            </Link>
                            <br/>
                            <span dangerouslySetInnerHTML={{__html: description}}/>
                            <br/>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>&#128197;</td>
                                        <td>{moment(startTimestamp).format("dddd, Do MMMM YYYY, h:mm a")}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </li>
                    ))}
                </ul>
            </section>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const allEvents = await getEvents();
    return {
        props: {
            allEvents
        }
    }
}