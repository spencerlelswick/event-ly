import EventDetailsModal from './EventDetailsModal';
import { decodeCat } from '../utilities/category';

export default function EventsListItem({ event, setPannedEvent }) {
  const handleClick = (e) => {
    setTimeout(() => {
      const lat = event.coordinates.latitude;
      const lng = event.coordinates.longitude;
      setPannedEvent([[lat, lng], 14]);
    }, 100);

    return null;
  };

  return (
    <div onClick={handleClick}>
      <hr />
      <img src={event.image} alt={event.name} />
      <div>{event.name}</div>
      <div>{new Date(event.date).toLocaleString()}</div>
      <div>{event.address}</div>
      <div>{event.location}</div>
      <div>{decodeCat(event.category)}</div>
      <EventDetailsModal modalId={event._id + '1'} eventId={event._id} />
      <hr />
    </div>
  );
}
