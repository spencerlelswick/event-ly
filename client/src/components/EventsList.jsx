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
      hidden={!isShowListView}
      className={`w-full h-[95vh] sm:visible absolute border-b bg-base-100 right-0 sm:w-2/5 sm:block overflow-y-scroll`}
    >
      <div>
        <button
          onClick={() => {
            setIsShowListView(!isShowListView);
          }}
          className='sm:hidden z-10 btn btn-sm btn-circle btn-secondary fixed right-8 top-28'
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
        
        <div className='flex flex-col justify-center items-center align-middle h-1/2'>
          <p className='text-error text-xl'>Loading events...</p>
        </div>
        
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
        <div className='flex flex-col justify-center items-center align-middle h-1/2'>
          <p className='text-error text-xl'>No events found in this area</p>
          <img src='/assets/evently-logo.png' className='w-[200px]' />
        </div>
      )}
    </div>
  );
}
