import { useState, useEffect } from 'react';
import { getAllEvents } from '../utilities/events-service';
import EventsListItem from './EventsListItem';

export default function EventsList({
  coordinates,
  eventsList,
  setEventsList,
  setPannedEvent,
}) {
  const [loading, setLoading] = useState(true);

  async function fetchEvents() {
    try {
      const eventsResponse = await getAllEvents(coordinates);

      if (eventsResponse.length || eventsResponse.length === 0) {
        setEventsList(eventsResponse);
        setLoading(false);
      } else {
        throw Error('Something went wrong with retrieving events.');
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchEvents();
  }, [coordinates]);

  return loading ? (
    <div>loading Events</div>
  ) : eventsList.length ? (
    <div>
      {eventsList.map((event) => (
        <EventsListItem
          event={event}
          key={event._id}
          setPannedEvent={setPannedEvent}
        />
      ))}
    </div>
  ) : (
    <div>no events in the area</div>
  );
}
