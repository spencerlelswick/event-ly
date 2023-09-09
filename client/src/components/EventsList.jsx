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
      console.log(eventFilter[c]);

      filterOpts.push(
        <label
          key={idx}
          htmlFor={c}
          className={`h-auto btn btn-square ${
            eventFilter[c] === true ? 'btn-primary text-white' : ''
          }`}
        >
          <p className='text-xs'>{c}</p>
          <div className='h-5 w-20 overflow-hidden'>
            <img
              src={`/assets/${idx + 1}.svg`}
              alt=''
              srcset=''
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
