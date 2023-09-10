import { showEvent } from '../utilities/events-service';
import { useState, useContext } from 'react';
import EventDetailsComments from './EventDetailsComments';
import EventDetailsGuests from './EventDetailsGuests';
import LoginButton from './LoginButton';
import { UserContext } from './App';
import { decodeCat } from '../utilities/category';

export default function EventDetailsModal({ modalId, eventId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingShow, setLoadingShow] = useState(true);
  const [event, setEvent] = useState(null);
  const currUser = useContext(UserContext);

  async function handleClick() {
    setIsModalOpen(true);
    retrieveData();
  }

  function handleCancel() {
    setIsModalOpen(false);
  }

  async function retrieveData() {
    try {
      const showResponse = await showEvent(eventId);
      if (showResponse?._id) {
        setEvent(showResponse);
        setLoadingShow(false);
      } else {
        console.log(showResponse);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <button
        onClick={() => handleClick()}
        className='btn btn-active btn-primary'
      >
        Event Details
      </button>

      <dialog id={modalId} className='modal' open={isModalOpen}>
        <div className='modal-box flex flex-col justify-center align-middle items-center w-full max-w-5xl'>
          {isModalOpen ? (
            <>
              {loadingShow ? (
                <div>Loading Events Details</div>
              ) : (
                <div className='w-full'>
                  {console.log(event)}
                  <div>{event.name}</div>
                  <img src={event.image} alt={event.name} className="w-1/4"/>
                  <div>
                    {new Date(event.date).toLocaleString()}
                  </div>
                  <div>{event.address}</div>
                  <div>{event.location}</div>
                  <div>{decodeCat(event.category)}</div>
                  <div>{event.description}</div>

                  <hr />
                  <div>
                    Host
                    <div className='flex flex-row align-middle items-center'>
                      <img
                        src={event.createdBy.picture}
                        alt={event.createdBy.name}
                        className='rounded-full w-10'
                      />
                      {event.createdBy.name}
                    </div>
                  </div>

                  <hr />
                  <EventDetailsGuests event={event} setEvent={setEvent} />

                  <hr />
                  <EventDetailsComments event={event} setEvent={setEvent} />

                  {!currUser ? <LoginButton /> : null}
                </div>
              )}
            </>
          ) : null}

          <form method='dialog'>
            <button
              className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
              onClick={handleCancel}
            >
              ✕
            </button>
          </form>
        </div>
        <form method='dialog' className='modal-backdrop'>
          <button onClick={handleCancel}>close</button>
        </form>
      </dialog>
    </>
  );
}
