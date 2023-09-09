import EventsListItem from './EventsListItem';
import { Categories } from '../utilities/category';
import { initFilter } from '../utilities/category';
import { decodeCat } from '../utilities/category';
import { isFiltered } from '../utilities/category';

export default function EventsList({
  eventsList,
  setPannedEvent,
  loadingEventsList,
  eventFilter,
  setEventFilter,
}) {
  const handleChange = (e) => {
    const updatedData = { ...eventFilter };
    updatedData[e.target.name] = e.target.checked;
    setEventFilter(updatedData);
  };

  const filterCats = () => {
    const filterOpts = [];
    Categories.forEach((c, idx) => {
      filterOpts.push(
        <label key={idx} htmlFor={c} className='btn'>
          {c}
          <input type='checkbox' value={idx + 1} name={c} id={c} />
        </label>
      );
    });

    return filterOpts;
  };

  return (
    <div
      style={{ height: '95vh' }}
      className='z-10 invisible sm:visible absolute bg-white right-0 w-2/5 overflow-auto'
    >
      <div className='flex justify-between m-2'>
        <form onChange={handleChange}>
          <h2>Event Filter</h2>
          {filterCats()}
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
        <div>No events in the area.</div>
      )}
    </div>
  );
}
