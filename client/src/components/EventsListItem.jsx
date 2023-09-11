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
    <div className='card w-96 bg-base-100 shadow-xl' onClick={handleClick}>
      <figure className='px-10 pt-10'>
        <img src={event.image} alt={event.name} />
      </figure>
      <div className='card-body items-center text-center'>
        <h2 className='card-title'>{event.name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div>{new Date(event.date).toLocaleString()}</div>
        <div>{event.address}</div>
        <div>{event.location}</div>
        <div>{decodeCat(event.category)}</div>
        <div className='card-actions'>
          <EventDetailsModal modalId={event._id + '1'} eventId={event._id} />
        </div>
      </div>
    </div>
  );
}
