import EventDetailsModal from './EventDetailsModal';
import { decodeCat } from '../utilities/category';
import { timeDisplay, dateDisplay } from '../utilities/dates';

export default function EventsListItem({ event, setPannedEvent }) {
  const handleClick = (e) => {
    setTimeout(() => {
      const lat = event.coordinates.latitude;
      const lng = event.coordinates.longitude;
      setPannedEvent([[lat, lng], 14, 1]);
    }, 100);

    return null;
  };

  return (
    <div
      className='card card-side bg-base-100 min-h-48 m-2 shadow flex flex-row'
      onClick={handleClick}
    >
      <figure className='w-1/3 relative'>
        <img
          className='h-full absolute hover:transform hover:scale-105 transition ease-linear'
          src={event.image}
          alt={event.name}
        />
      </figure>
      <div className='w-2/3 h-full card-body bg-base-200 flex flex-col justify-center align-middle items-start rounded-lg shadow'>
        <div>
          <h2 className='card-title text-2xl'>{event.name}</h2>
          <p>
            Starts at{' '}
            <span className='text-primary font-semibold'>
              {timeDisplay(event.date)}
            </span>
          </p>
          <p>
            on{' '}
            <span className='text-primary font-semibold'>
              {dateDisplay(event.date)}
            </span>
          </p>
          <div className='absolute top-2 right-2 badge badge-secondary'>
            {decodeCat(event.category)}
          </div>
        </div>
        <EventDetailsModal modalId={event._id + '_list'} eventId={event._id} />
      </div>
    </div>
  );
}
