export default function EventListItem({event}){
    return(
        <div>
            <hr />
            <div>{event.name}</div>
            <div>{event.location}</div>
            <div>{event.address}</div>
            <div>{event.coordinates.latitude}</div>
            <hr />
        </div>
    )
}