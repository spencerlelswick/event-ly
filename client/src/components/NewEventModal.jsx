import { useEffect, useState, useContext } from 'react';
import { createEvent } from '../utilities/events-service';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from './App';
import { decodeCat } from '../utilities/category';
import { FaSearch } from 'react-icons/fa';
import { getSearchImage } from '../utilities/images-service';

function NewEventModal({ point, displayToast, fetchEvents, address }) {
  const currUser = useContext(UserContext);
  const initState = {
    name: '',
    coordinates: point,
    category: '1',
    location: '',
    date: '',
    image: null,
    title: '',
    description: '',
    search: '',
    createdBy: currUser.ID,
  };
  const [newEvent, setNewEvent] = useState(initState);
  const [show, setShow] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState(null);
  const [images, setImages] = useState([]);
  let carouselIdx = 0;
  const minDate = new Date();
  minDate.setDate(minDate.getDate() - 1);

  const handleClose = (state) => {
    setShow(state);
  };

  const clearSelectedImage = (e) => {
    setNewEvent({ ...newEvent, image: null });
  };

  const handleImgClick = (image) => {
    setNewEvent({ ...newEvent, image: image.urls.regular });
  };

  function handleChange(e) {
    const updatedData = {
      ...newEvent,
      address: address.name,
      coordinates: point,
      createdBy: currUser.ID,
      [e.target.name]: e.target.value,
    };
    setNewEvent(updatedData);
  }

  function handleCancel() {
    document.getElementById("new_event_modal").close();
    setNewEvent(initState);
    setIsModalOpen(false);
  }

  useEffect(() => {
    const getData = setTimeout(() => {
      getSearchImage(search)
        .then((res) => {
          return res.results;
        })
        .then((results) => {
          setImages(results);
        });
    }, 1000);
    return () => clearTimeout(getData);
  }, [search]);

  async function handleSubmit(e) {
    e.preventDefault();
    displayToast(`${newEvent.name} has been added!`);
    try {
      const res = await createEvent(newEvent);
      if (res._id) {
        handleCancel()
        fetchEvents();
      }
    } catch (err) {
      console.log(err);
    }
  }

  function handleClick() {
    setIsModalOpen(true)
    document.getElementById("new_event_modal").showModal();
  }

  return (
    <>
      {address && currUser ? (
        <button
          onClick={handleClick}
          className='w-full md:w-6/12 btn btn-primary'
        >
          Add Event
        </button>
      ) : null}
      <dialog id='new_event_modal' className='modal' >
        {isModalOpen ? (
          <form
            onSubmit={handleSubmit}
            method='dialog'
            className=' z-30 modal-box flex flex-col justify-center align-middle items-center'
          >
            <div className='form-control w-full max-w-xs'>
              <p className='text-sm'>Confirm address:</p>
              <p className='text-2xl'>{`${address.name}`}</p>
              <div className='form-control w-full max-w-xs'>
                <label className='label' htmlFor='name'>
                  <span className='label-text'>Name your event:</span>
                </label>
                <input
                  type='text'
                  required
                  name='name'
                  value={newEvent.name}
                  onChange={handleChange}
                  className='input input-bordered w-full max-w-xs input-primary'
                />
              </div>
              <div className='form-control w-full max-w-xs'>
                <label className='label' htmlFor='location'>
                  <span className='label-text'>Location description</span>
                </label>
                <input
                  type='text'
                  name='location'
                  required
                  placeholder='Room 5, near the swingset, etc.'
                  value={newEvent.location}
                  onChange={handleChange}
                  className='input input-bordered w-full max-w-xs input-primary'
                />
              </div>
              <div className='form-control w-full max-w-xs'>
                <label className='label'>
                  <span className='label-text'>Pick a category:</span>
                </label>
                <select
                  name='category'
                  onChange={handleChange}
                  defaultValue={'1'}
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
                <label className='label' htmlFor='date'>
                  <span className='label-text'>Event start time:</span>
                </label>

                <input
                  className='primary label-text input input-bordered w-full max-w-xs input-primary'
                  type='datetime-local'
                  value={newEvent.date}
                  onChange={handleChange}
                  id='date'
                  required
                  name='date'
                  min={new Date().toISOString().slice(0, -8)}
                />
              </div>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Event description:</span>
                </label>
                <textarea
                  name='description'
                  value={newEvent.description}
                  onChange={handleChange}
                  className='textarea textarea-bordered h-24 border-primary'
                  placeholder='Description'
                  required
                ></textarea>
              </div>
              <div className='form-control w-full max-w-xs'>
                {!newEvent.image ? (
                  <div>
                    <label className='label' htmlFor='image'>
                      <span className='label-text'>Search for an image:</span>
                    </label>
                    <input
                      hidden
                      type='text'
                      name='image'
                      placeholder={newEvent.image}
                      value={newEvent.image}
                      onChange={handleChange}
                      className='input input-bordered w-full max-w-xs input-primary'
                    />

                    <div className='h-48 carousel carousel-vertical rounded-box'>
                      {images.map((i, idx) => (
                        <div className='carousel-item h-48' key={idx}>
                          <img
                            className='w-full'
                            src={i.urls.regular}
                            onClick={() => handleImgClick(i)}
                          />
                        </div>
                      ))}
                    </div>
                    <div className='input-group '>
                      <input
                        type='text'
                        placeholder='Click an image to select'
                        onChange={(e) => setSearch(e.target.value)}
                        className='input input-primary w-full max-w-xs'
                      />
                      <button className='btn btn-square btn-primary'>
                        <FaSearch />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className='label' htmlFor='image'>
                      <span className='label-text'>You have selected:</span>
                    </label>
                    <img onClick={clearSelectedImage} src={newEvent.image} />
                  </div>
                )}
              </div>
              <input type='submit' className='btn btn-primary mt-5' />
            </div>
          </form>
        ) : (null)}
        <form method='dialog'>
          <button
            className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
            onClick={handleCancel}
          >
            ✕
          </button>
        </form>
        <form method='dialog' className='modal-backdrop'>
          <button onClick={handleCancel}>close</button>
        </form>
      </dialog>

    </>
  );
}

export default NewEventModal;
