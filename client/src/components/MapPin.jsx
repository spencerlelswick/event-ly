import { Marker, Popup } from 'react-leaflet';
import { decodeCat } from '../utilities/category';
import EventDetailsModal from './EventDetailsModal';
import { dateDisplay } from '../utilities/dates';
import { fullDateDisplay } from '../utilities/dates';

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
        <div className='flex flex-col  gap-1 mb-1 mx-1 min-h-60 max-w-[200px] '>
          <div className='avatar'>
            <div className='mb-1 rounded-btn w-56 h-24'>
              <img src={event.image} />
            </div>
          </div>

          <h2 className='card-title'>{event.name}</h2>
          <div className='flex flex-row justify-end gap-1'>
            {dateDisplay(event.createdAt) === dateDisplay(new Date()) ? (
              <div className='badge badge-secondary'>NEW </div>
            ) : null}
            {dateDisplay(event.date) === dateDisplay(new Date()) ? (
              <div className='badge badge-secondary'>TODAY </div>
            ) : null}
          </div>
          <h2>{fullDateDisplay(event.date)}</h2>

          <h2 className=''>{event.address}</h2>

          <EventDetailsModal modalId={event._id + '_pin'} eventId={event._id} />
        </div>
        <div className='card-actions justify-end mt-2'>
          <div className='badge badge-outline'>
            Guests: {event.guests.length}
          </div>
          <div className='badge badge-outline'>{decodeCat(event.category)}</div>
        </div>
      </Popup>
    </Marker>
  );
}
