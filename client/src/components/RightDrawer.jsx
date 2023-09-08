import EventsListItem from "./EventsListItem";

export default function RightDrawer({
  eventsList,
  setPannedEvent,
  loadingEventsList
}) {
  return (
    <div
      style={{ height: '95vh' }}
      className='z-10 invisible sm:visible absolute bg-white right-0 w-2/5 overflow-auto'
    >
      <div className='flex justify-between m-2'>
        <h2 className='text-4xl'>Event List:</h2>
      </div>

      {loadingEventsList ? (
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
      )};


    </div>
  );
}
