import { updateEvent } from '../utilities/events-service';
import { deleteEvent } from '../utilities/events-service';
import { useState } from 'react';
import { decodeCat } from '../utilities/category';
import { Link } from 'react-router-dom';
import {
  dateTimePicker,
  dateTimePickerToday,
  fullDateDisplay,
} from '../utilities/dates';
import { useNavigate } from 'react-router-dom';

export default function UserPanelItem({
  event,
  currUser,
  routeId,
  retrieveEvents,
  past,
  type,
  setPannedEvent,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editEvent, setEditEvent] = useState('');
  const modalId = event._id + '_edit';
  const navigate = useNavigate();

  async function handleDelete(e) {
    try {
      e.preventDefault();
      const res = await deleteEvent(event._id);
      if (res._id) {
        retrieveEvents();
      } else {
        throw Error('Something went wrong with deleting an event.');
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleRemove(e) {
    try {
      e.preventDefault();
      const data = [...event.guests];
      const idx = data.indexOf(currUser.ID);
      data.splice(idx, 1);
      const updatedEvent = await updateEvent(event._id, { guests: data });
      if (updatedEvent._id) {
        retrieveEvents();
      } else {
        throw Error('Something went wrong with removing a guest.');
      }
    } catch (err) {
      console.log(err);
    }
  }

  function handleClick() {
    setIsModalOpen(true);
    document.getElementById(modalId).showModal();
    const data = {
      name: event.name,
      location: event.location,
      description: event.description,
      category: event.category,
      date: dateTimePicker(event.date),
    };
    setEditEvent(data);
  }

  function handleCancel() {
    document.getElementById(modalId).close();
    setIsModalOpen(false);
  }

  function handleChange(e) {
    const data = {
      ...editEvent,
      [e.target.name]: e.target.value,
    };
    setEditEvent(data);
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      handleCancel();
      const data = { ...editEvent };
      data.date = new Date(data.date).toISOString();
      const res = await updateEvent(event._id, data);
      if (res._id) {
        retrieveEvents();
      } else {
        throw Error('Something went wrong retrieving the events.');
      }
    } catch (err) {
      console.log(err);
    }
  }

  function handleMove(e) {
    e.preventDefault();
    const coord = [event.coordinates.latitude, event.coordinates.longitude];
    setPannedEvent([coord, 15, 2]);
    navigate('/');
  }

  return (
    <div>
      <div className='card md:card-side bg-base-200 min-h-48 shadow-xl m-5'>
        <figure className=' relative md:max-h-max md:w-1/3'>
          <img
            src={event.image}
            alt={event.name}
            className='h-full md:absolute hover:transform hover:scale-105 transition ease-linear'
          />
        </figure>
        <div className='card-body  md:w-2/3 min-h-full'>
          <h2 className='card-title font-extrabold capitalize text-2xl justify-center'>
            {event.name}
          </h2>
          <div className='h-full'>
            <div className='grid grid-cols-[1fr,4fr]'>
              <span className='font-semibold border-b-[0.1px] border-gray-100 px-2'>
                Date:
              </span>{' '}
              <p className='m-0 border-b-[0.1px] border-gray-100 '>
                {fullDateDisplay(event.date)}
              </p>
              <span className='font-semibold block border-b-[0.1px] border-gray-100 px-2'>
                Location:
              </span>
              <p className='m-0 border-b-[0.1px] border-gray-100'>
                {event.location}
              </p>
              <span className='font-semibold  border-b-[0.1px] border-gray-100 px-2'>
                Category:
              </span>{' '}
              <p className='m-0 border-b-[0.1px] border-gray-100'>
                {decodeCat(event.category)}
              </p>
              <span className='font-semibold border-b-[0.1px] border-gray-100 px-2'>
                Description:
              </span>{' '}
              <p className='break-words whitespace-normal m-0 border-b-[0.1px] border-gray-100 '>
                {event.description}
              </p>
              <span className='font-semibold border-b-[0.1px] border-gray-100 px-2'>
                Participants:
              </span>{' '}
              <p className='m-0 border-b-[0.1px] border-gray-100'>
                {event.guests.length}
              </p>
              <span
                className='font-semibold border-b-[0.1px] border-gray-100 px-2'
                hidden={type === 'created'}
              >
                Host Profile:
              </span>{' '}
              <p
                className='m-0 border-b-[0.1px] border-gray-100'
                hidden={type === 'created'}
              >
                <Link to={`/user/${event.createdBy}`}> Link </Link>
              </p>
              <span className='font-semibold block border-b-[0.1px] border-gray-100 px-2'>
                Address:
              </span>
              <p className='m-0 border-b-[0.1px] border-gray-100'>
                {event.address}
              </p>
            </div>
          </div>

          <div className='card-actions'>
            {currUser.ID === routeId ? (
              <div className='flex flex-col w-full'>
                <div hidden={past}>
                  <div
                    className={`${type === 'attending'
                        ? 'hidden'
                        : 'flex flex-row justify-center gap-x-5 flex-wrap'
                      }`}
                  >
                    <button
                      className='btn md:btn-sm btn-secondary m-2'
                      onClick={handleMove}
                    >
                      show on map
                    </button>
                    <button
                      className='btn md:btn-sm btn-primary m-2'
                      onClick={handleClick}
                    >
                      Update event
                    </button>
                    <button
                      className='btn md:btn-sm btn-outline btn-error m-2'
                      onClick={handleDelete}
                    >
                      Delete event
                    </button>
                  </div>
                </div>

                <div hidden={past}>
                  <div
                    className={`${type === 'created'
                        ? 'hidden'
                        : 'flex flex-row justify-center gap-10'
                      }`}
                  >
                    <button
                      className='btn md:btn-sm btn-secondary m-2'
                      onClick={handleMove}
                    >
                      show on map
                    </button>
                    <button
                      className='btn md:btn-sm btn-error btn-outline m-2'
                      onClick={handleRemove}
                    >
                      Remove me
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div hidden={past}>
                <button
                  className='btn md:btn-sm btn-secondary m-2'
                  onClick={handleMove}
                >
                  show on map
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <dialog
        className='modal'
        id={modalId}
        hidden={type === 'attending' || past}
      >
        <div className='modal-box flex flex-col justify-center align-middle items-center  no-scrollbar'>
          {isModalOpen ? (
            <form
              method='dialog'
              className='w-full max-w-xs'
              onSubmit={handleSubmit}
            >
              <div className='form-control w-full max-w-xs'>
                <label className='label label-text'>Edit name:</label>
                <input
                  type='text'
                  name='name'
                  required
                  defaultValue={event.value}
                  value={editEvent.name}
                  onChange={handleChange}
                  className='input input-bordered w-full max-w-xs input-primary'
                />
              </div>

              <div className='form-control w-full max-w-xs'>
                <label className='label label-text'>
                  Edit location description
                </label>
                <input
                  type='text'
                  name='location'
                  required
                  value={editEvent.location}
                  onChange={handleChange}
                  className='input input-bordered w-full max-w-xs input-primary'
                />
              </div>

              <div className='form-control w-full max-w-xs'>
                <label className='label label-text'>Edit category:</label>
                <select
                  name='category'
                  required
                  onChange={handleChange}
                  value={editEvent.category}
                  className='select select-bordered select-primary'
                >
                  {(() => {
                    const arr = [];
                    for (let i = 1; i <= 12; i++) {
                      arr.push(
                        <option key={i} value={i}>
                          {decodeCat(i)}
                        </option>
                      );
                    }
                    return arr;
                  })()}
                </select>
              </div>

              <div className='form-control w-full max-w-xs'>
                <label className='label label-text'>Edit start time:</label>
                <input
                  className='primary label-text input input-bordered w-full max-w-xs input-primary'
                  type='datetime-local'
                  value={editEvent.date}
                  onChange={handleChange}
                  id='date'
                  name='date'
                  min={dateTimePickerToday()}
                />
              </div>

              <div className='form-control'>
                <label className='label label-text'>Edit description:</label>
                <textarea
                  name='description'
                  value={editEvent.description}
                  onChange={handleChange}
                  className='textarea textarea-bordered h-24 border-primary'
                  required
                ></textarea>
              </div>

              <button className='btn btn-primary m-2' type='submit'>
                Edit
              </button>
            </form>
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
    </div>
  );
}
