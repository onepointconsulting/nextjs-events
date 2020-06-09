import moment from "moment-timezone";

export default function Date({ dateString: startDateString, timezone }) {
    return (
        <p>&#128197; {moment(startDateString).format("dddd, Do MMMM YYYY, h:mm a")} ({timezone})</p>
    )
}