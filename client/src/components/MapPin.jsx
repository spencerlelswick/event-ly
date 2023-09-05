import { Marker,Popup } from "react-leaflet"
import EventDetailsModal from "./EventDetailsModal"

export default function MapPin({event}){
    return(
        <Marker position={[event.coordinates.latitude, event.coordinates.longitude]}>
            <Popup>
                <img src={event.image} alt={event.name}/>
                <div>{event.name} <br /> {event.address} </div>
                <EventDetailsModal modalId={event._id+"2"} eventId={event._id}/>
            </Popup>
        </Marker>
    )
}