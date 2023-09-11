import { Marker, Popup } from 'react-leaflet';
import EventDetailsModal from './EventDetailsModal';

export default function MapPin({ event }) {
  const pointerIcon = new L.Icon({
    iconUrl: `/assets/${event.category}.svg`,
    iconRetinaUrl: `/assets/${event.category}.svg`,
    iconAnchor: [32, 60],
    popupAnchor: [0, -60],
    iconSize: [64, 64],
  });

  return (
    <Marker
      position={[event.coordinates.latitude, event.coordinates.longitude]}
      icon={pointerIcon}
    >
      <Popup autoPan={false}>
        <img src={event.image} alt={event.name} />
        <div>
          {event.name} <br /> {event.address}{' '}
        </div>

        <EventDetailsModal modalId={event._id + '_pin'} eventId={event._id} />
      </Popup>
    </Marker>
  );
}
