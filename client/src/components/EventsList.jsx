import EventsListItem from './EventsListItem';
import { Categories } from '../utilities/category';
import { isFiltered } from '../utilities/category';
import EventsListFilter from './EventsListFilter';
export default function EventsList({
  eventsList,
  setPannedEvent,
  loadingEventsList,
  eventFilter,
  setEventFilter,
  setSorted
}) {

  return (
    <div
      style={{ height: '95vh' }}
      className='z-10 invisible sm:visible absolute border-b  bg-white right-0 w-2/5 overflow-auto'
    >
      <EventsListFilter eventFilter={eventFilter} setEventFilter={setEventFilter}/>

      <div className='flex justify-between m-2'>
        <form >
          <h2>Sort by</h2>
          <select
          defaultValue={"date"}
          className='select select-bordered select-primary'
          onChange={(e)=>setSorted(e.target.value)}
          >
            <option value={"date"}>Upcoming</option>
            <option value={"dist"}>Proximity</option>
            <option value={"guests"}>Number of Guests</option>
            <option value={"name"}>Name</option>
            <option value={"nameInv"}>Name - inverse</option>
          </select>
        </form>
      </div>

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
          <img src="/assets/evently-logo.png" />
        </>
      )}
    </div>
  );
}
