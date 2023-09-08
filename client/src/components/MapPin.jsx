import { Marker, Popup } from 'react-leaflet';
import EventDetailsModal from './EventDetailsModal';

export default function MapPin({ event }) {
  const pointerIcon = new L.Icon({
    iconUrl: `./src/assets/${event.category}.svg`,
    iconRetinaUrl: `./src/assets/${event.category}.svg`,
    iconAnchor: [32, 60],
    popupAnchor: [-30, -50],
    iconSize: [64, 64],
  });

  return (
    <Marker
      position={[event.coordinates.latitude, event.coordinates.longitude]}
      icon={pointerIcon}
    >
      <Popup>
        <img src={event.image} alt={event.name} />
        <div>
          {event.name} <br /> {event.address}{' '}
        </div>
        <EventDetailsModal modalId={event._id + '2'} eventId={event._id} />
      </Popup>
    </Marker>
  );
}
