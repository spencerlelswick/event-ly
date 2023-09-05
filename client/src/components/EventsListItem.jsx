import EventDetailsModal from "./EventDetailsModal"

export default function EventsListItem({event}){

    return(
        <div>
            <hr />
            <div>{event.name}</div>
            <img src={event.image} alt={event.name}/>
            <div>{event.location}</div>
            <EventDetailsModal eventId={event._id}/>
            <hr />
        </div>
    )
}