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
    <div
      className='card card-side bg-base-100 min-h-48 mx-1 my-2 shadow flex flex-row'
      onClick={handleClick}
    >
      <figure className='w-1/3 relative'>
        <img className='h-full absolute' src={event.image} alt={event.name} />
      </figure>
      <div className='w-2/3 h-full card-body flex flex-col justify-center align-middle items-start'>
        <div>
          <h2 className='card-title text-2xl'>{event.name}</h2>
          <span>Starting at </span>
          <span className='text-primary font-semibold'>
            {new Date(event.date).toLocaleString()}
          </span>
          <div>{decodeCat(event.category)}</div>
        </div>
        <EventDetailsModal modalId={event._id + '1'} eventId={event._id} />
      </div>
    </div>
  );
}
