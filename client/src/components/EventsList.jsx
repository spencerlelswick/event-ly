import EventsListItem from './EventsListItem';
import { isFiltered } from '../utilities/category';
import EventsListFilter from './EventsListFilter';
import EventsListSort from './EventsListSort';

export default function EventsList({
  eventsList,
  setPannedEvent,
  loadingEventsList,
  eventFilter,
  setEventFilter,
  setSorted,
}) {

  return (
    <div
      style={{ height: '95vh' }}
      className='z-10 invisible sm:visible absolute border-b  bg-white right-0 w-2/5 overflow-auto'
    >

      <EventsListFilter eventFilter={eventFilter} setEventFilter={setEventFilter}/>

      <EventsListSort setSorted={setSorted}/>

      {loadingEventsList ? (
        <div>Loading events...</div>
      ) : eventsList.length ? (
        <div>
          {eventsList.map((event) =>
            isFiltered(event, eventFilter) ? (
              <EventsListItem
                event={event}
                key={event._id}
                setPannedEvent={setPannedEvent}
              />
            ) : null
          )}
        </div>
      ) : (
        <>
          <div>No events in the area.</div>
          <img src='/assets/evently-logo.png' />
        </>
      )}
    </div>
  );
}
