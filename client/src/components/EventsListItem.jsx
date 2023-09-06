import EventDetailsModal from './EventDetailsModal';

export default function EventsListItem({ event, setPannedEvent }) {
  const handleClick = (e) => {
    // console.log(event);
    setTimeout(() => {
      const lat = event.coordinates.latitude;
      const lng = event.coordinates.longitude;
      setPannedEvent([lat, lng]);
    }, 100);

    return null;
  };

  return (
    <div onClick={handleClick}>
      <hr />
      <div>{event.name}</div>
      <img src={event.image} alt={event.name} />
      <EventDetailsModal modalId={event._id + '1'} eventId={event._id} />
      <hr />
    </div>
  );
}
