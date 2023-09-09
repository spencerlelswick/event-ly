import EventsListItem from './EventsListItem';
import { Categories } from '../utilities/category';
import { isFiltered } from '../utilities/category';

export default function EventsList({
  eventsList,
  setPannedEvent,
  loadingEventsList,
  eventFilter,
  setEventFilter,
  setSorted
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
        <label
          key={idx}
          htmlFor={c}
          className={`h-auto btn btn-square ${eventFilter[c] === true ? 'btn-primary text-white' : ''
            }`}
        >
          <p className='text-xs'>{c}</p>
          <div className='h-5 w-20 overflow-hidden'>
            <img
              src={`/assets/${idx + 1}.svg`}
              className='relative object-fill'
            />
          </div>

          <input
            type='checkbox'
            value={idx + 1}
            name={c}
            id={c}
            className={`hidden`}
          />
        </label>
      );
    });

    return filterOpts;
  };

  return (
    <div
      style={{ height: '95vh' }}
      className='z-10 invisible sm:visible absolute border-b  bg-white right-0 w-2/5 overflow-auto'
    >
      <div className='flex justify-between m-2'>
        <form onChange={handleChange}>
          <h2>Event Filter</h2>
          {filterCats(eventFilter)}
        </form>
      </div>

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
