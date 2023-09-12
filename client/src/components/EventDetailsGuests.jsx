import { updateEvent } from '../utilities/events-service';
import { useContext } from 'react';
import { UserContext } from './App';

export default function EventDetailsGuests({ event, setEvent }) {
  const currUser = useContext(UserContext);
  async function handleParticipate(e) {
    try {
      e.preventDefault();
      const data = [...event.guests, currUser.ID];
      const updatedEvent = await updateEvent(event._id, { guests: data });
      if (updatedEvent._id) {
        setEvent(updatedEvent);
      } else {
        throw Error('Something went wrong with adding a guest.');
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleRemove(e) {
    try {
      e.preventDefault();
      const data = [...event.guests];
      const idx = data.indexOf(data.find((g) => g._id === currUser.ID));
      data.splice(idx, 1);
      const updatedEvent = await updateEvent(event._id, { guests: data });
      if (updatedEvent._id) {
        setEvent(updatedEvent);
      } else {
        throw Error('Something went wrong with removing a guest.');
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      {event.guests.length ? (
        <div>
          <div className='avatar-group -space-x-6'>
            {event.guests.map((g, idx) => (
              <>
                {idx <= 2 ? (
                  <div className='avatar'>
                    <div className='w-12'>
                      <img
                        src={g.picture}
                        alt={g.name}
                        className='rounded-full w-10'
                      />
                    </div>
                  </div>
                ) : (
                  <div className='avatar placeholder'>
                    <div className='w-12 bg-primary'>
                      <span className=' text-base-100 text-2xl'>
                        +{event.guests.length - 3}
                      </span>
                    </div>
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
      ) : (
        <div className='my-5'>No one yet. Be the first!</div>
      )}
      {currUser ? (
        <>
          {event.guests.find((g) => g._id === currUser.ID) === undefined ? (
            <button
              onClick={handleParticipate}
              className='btn btn-primary w-full max-w-xs'
              disabled={currUser.ID === event.createdBy._id}
            >
              Participate
            </button>
          ) : (
            <button
              onClick={handleRemove}
              className='btn btn-secondary w-full max-w-xs'
            >
              Remove me
            </button>
          )}
        </>
      ) : (
        <p>LOG IN TO PARTICIPATE</p>
      )}
    </div>
  );
}
