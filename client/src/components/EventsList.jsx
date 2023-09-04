import { useState, useEffect } from "react"
import { getAllEvents } from "../utilities/events-service"
import EventListItem from "./EventListItem"

export default function EventsList({ coordinates }) {

    const [eventList, setEventList] = useState(null)
    const [loading, setLoading] = useState(true)

    async function fetchEvents() {

        const eventsResponse = await getAllEvents(coordinates)

        if (eventsResponse.length || eventsResponse.length === 0) {
            setEventList(eventsResponse)
            setLoading(false)
        } else {
            console.log(eventsResponse)
        }
    }

    useEffect(() => {
        fetchEvents()
    }, [coordinates])

    return (loading ? (
        <div>loading Events</div>
    ) : (eventList.length ? (
        <div>
            {eventList.map((event) => (
               <EventListItem event={event} key={event._id}/>
            ))}
        </div>
    ) : (
        <div>no events in the area</div>
    )))
}