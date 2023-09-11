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
  isShowListView,
  setIsShowListView,
}) {
  return (
    <div
      className={`${
        isShowListView ? 'visible' : 'invisible'
      } w-full h-[90vh] sm:visible absolute border-b bg-white right-0 sm:w-2/5 overflow-y-scroll`}
    >
      <div>
        <button
          onClick={() => {
            setIsShowListView(!isShowListView);
          }}
          className='sm:hidden z-10 btn btn-sm btn-circle btn-secondary fixed right-14 top-32'
        >
          ✕
        </button>
      </div>

      <EventsListFilter
        eventFilter={eventFilter}
        setEventFilter={setEventFilter}
      />

      <EventsListSort setSorted={setSorted} />

      {loadingEventsList ? (
        <>
          <div>Loading events...</div>
          <img src='/assets/evently-logo.png' />
        </>
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
