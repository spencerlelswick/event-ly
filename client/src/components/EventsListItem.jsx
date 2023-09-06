import EventDetailsModal from "./EventDetailsModal"

export default function EventsListItem({event}){

    return(
        <div>
            <hr />
            <div>{event.name}</div>
            <img src={event.image} alt={event.name}/>
            <EventDetailsModal modalId={event._id+"1"} eventId={event._id}/>
            <hr />
        </div>
    )
}