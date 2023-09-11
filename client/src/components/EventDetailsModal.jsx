import { showEvent } from '../utilities/events-service';
import { useState, useContext } from 'react';
import EventDetailsComments from './EventDetailsComments';
import EventDetailsGuests from './EventDetailsGuests';
import LoginButton from './LoginButton';
import { UserContext } from './App';
import { decodeCat } from '../utilities/category';
import { FaStar } from 'react-icons/fa';
import { FaRegClock, FaLocationDot } from 'react-icons/fa6';
import { Link } from 'react-router-dom';


export default function EventDetailsModal({ modalId, eventId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingShow, setLoadingShow] = useState(true);
  const [event, setEvent] = useState(null);
  const currUser = useContext(UserContext);

  async function handleClick() {
    document.getElementById(modalId).showModal();
    setIsModalOpen(true);
    retrieveData();
  }

  function handleCancel() {
    document.getElementById(modalId).close();
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
    <div>
      <button
        onClick={() => handleClick()}
        className='btn btn-active btn-primary'
      >
        Event Details
      </button>

      <dialog id={modalId} className='modal w-screen'>
        <div className='modal-box flex w-screen h-screen'>
          {isModalOpen ? (
            <>
              {loadingShow ? (
                <div>Loading Events Details</div>
              ) : (
                <div className='flex-col justify-center items-center'>
                  <div className='card'>
                    <figure>
                      <img src={event.image} alt={event.name} />
                    </figure>
                    <h1 className='text-3xl text-center my-2'>{event.name}</h1>
                    <div className='card-body'>
                      <h2 className='card-title'>
                        <span>
                          <FaRegClock />
                        </span>
                        {new Date(event.date).toLocaleString()}
                      </h2>
                      <h2 className='card-title'>
                        <span>
                          <FaLocationDot />
                        </span>
                        {event.address}
                      </h2>
                    </div>
                  </div>
                  <div className='card flex flex-col'>
                    <h2 className='card-title'>Details</h2>

                    <p>
                      Location: <span>{event.location}</span>
                    </p>

                    <div className='mx-5'>
                      <p>{event.description}</p>
                    </div>
                  </div>
                  <div className='card flex flex-col'>
                    <div className='card-title'>Host</div>

                    <div className='card'>
                      <figure className='px-10 pt-10'>
                        <img
                          src={event.createdBy.picture}
                          alt={event.createdBy.name}
                          className='rounded-xl'
                        />
                      </figure>
                      <div className='card-body items-center text-center'>
                        <h2 className='card-title'>
                          <FaStar className='text-yellow-300 inline' />
                          {event.createdBy.name}
                          <span className='text-xs italic ml-1 text-gray-400'>
                            (Host)
                          </span>
                        </h2>
                        <div className='card-actions'>
                          <Link
                            to={`/user/${event.createdBy._id}`}
                            className='btn btn-primary'
                          >
                            Profile
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='card flex flex-col'>
                    <div className='card-title'>Guests</div>
                    <div className='card-body'>
                      <EventDetailsGuests event={event} setEvent={setEvent} />
                    </div>
                  </div>

                  <div className='card flex flex-col '>
                    <h2 className='card-title'>Comments</h2>
                    <div className='card-body'>
                      <EventDetailsComments event={event} setEvent={setEvent} />
                      {!currUser ? <LoginButton /> : null}
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : null}

          <form method='dialog'>
            <button
              className='btn btn-sm btn-circle btn-ghost fixed right-2 top-2'
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
    </div>
  );
}
