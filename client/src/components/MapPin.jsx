import { Marker,Popup } from "react-leaflet"

export default function MapPin({event}){
    return(
        <Marker position={[event.coordinates.latitude, event.coordinates.longitude]}>
            <Popup>
            {event.name} <br /> {event.address}
            </Popup>
        </Marker>
    )
}