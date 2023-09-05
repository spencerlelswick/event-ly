import EventDetailsModal from "./EventDetailsModal"

export default function EventsListItem({event}){

    return(
        <div>
            <hr />
            <div>{event.name}</div>
            <img src={event.image} alt={event.name}/>
            <div>{event.location}</div>
            <EventDetailsModal modalId={event._id+"1"} eventId={event._id}/>
            <hr />
        </div>
    )
}