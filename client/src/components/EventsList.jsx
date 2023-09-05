import { useState, useEffect } from "react"
import { getAllEvents } from "../utilities/events-service"
import EventsListItem from "./EventsListItem"

export default function EventsList({coordinates,eventsList,setEventsList}) {

    const [loading, setLoading] = useState(true)

    async function fetchEvents() {

        const eventsResponse = await getAllEvents(coordinates)

        if (eventsResponse.length || eventsResponse.length === 0) {
            setEventsList(eventsResponse)
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
    ) : (eventsList.length ? (
        <div>
            {eventsList.map((event) => (
               <EventsListItem event={event} key={event._id}/>
            ))}
        </div>
    ) : (
        <div>no events in the area</div>
    )))
}