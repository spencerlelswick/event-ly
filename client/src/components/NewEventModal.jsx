import { useEffect, useState, useContext } from 'react';
import { createEvent } from '../utilities/events-service';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from './App';
import { decodeCat } from '../utilities/category';
import { FaSearch } from 'react-icons/fa';
import { getSearchImage } from '../utilities/images-service';
import { dateTimePickerToday } from '../utilities/dates';

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
    let updatedData = {
      ...newEvent,
      address: address.name,
      coordinates: point,
      createdBy: currUser.ID,
      [e.target.name]: e.target.value,
    };
    setNewEvent(updatedData);
  }

  function handleCancel() {
    document.getElementById('new_event_modal').close();
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
    let newData = { ...newEvent };
    console.log(newData);
    newData.date = new Date(newData.date).toISOString();
    try {
      const res = await createEvent(newData);
      if (res._id) {
        displayToast(`${newEvent.name} was added successfully!`);
        handleCancel();
        fetchEvents();
      } else {
        displayToast(
          `Something went wrong. ${newEvent.name} has not been created.`
        );
      }
    } catch (err) {
      console.log(err);
    }
  }

  function handleClick() {
    setIsModalOpen(true);
    document.getElementById('new_event_modal').showModal();
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
      <dialog id='new_event_modal' className='modal'>
        {isModalOpen ? (
          <form

            className='w-10/12 sm:w-9/12 sm:px-10 md:w-8/12 md:max-w-[630px] lg:w-1/3 lg:min-w-[630px]
            modal-box flex flex-col  align-middle items-center max-w-none max-h-1/2 no-scrollbar'
            onChange={handleChange}
            onSubmit={handleSubmit}
          >
            <div className='w-full max-w-sm max-h-full'>
              <div className='form-control mt-5'>
                <p className='text-sm '>Selected address:</p>
                <p className='text-xl'>{`${address.name}`}</p>

                <div className='form-control'>
                  <label className='label' htmlFor='name'>
                    <span className='label-text'>Name your event:</span>
                  </label>
                  <input
                    type='text'
                    required
                    name='name'
                    maxLength={50}
                    value={newEvent.name}
                    onChange={handleChange}
                    className='input input-md md:input-sm first-line:input-bordered input-primary'
                  />
                </div>

                <div className='form-control '>
                  <label className='label' htmlFor='location'>
                    <span className='label-text'>Describe the location:</span>
                  </label>
                  <input
                    type='text'
                    name='location'
                    required
                    placeholder='Room 5, near the swingset, etc.'
                    maxLength={99}
                    value={newEvent.location}
                    onChange={handleChange}
                    className='input input-md md:input-sm input-bordered input-primary'
                  />
                </div>

                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text'>Pick a category:</span>
                  </label>
                  <select
                    name='category'
                    onChange={handleChange}
                    defaultValue={'1'}
                    className='select select-md md:select-sm select-bordered select-primary'
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

                <div className='form-control '>
                  <label className='label' htmlFor='date'>
                    <span className='label-text'>Set the start time:</span>
                  </label>
                  <input
                    className='input-md md:input-sm primary label-text input input-bordered input-primary'
                    type='datetime-local'
                    value={newEvent.date}
                    onChange={handleChange}
                    id='date'
                    required
                    name='date'
                    min={dateTimePickerToday()}
                  />
                </div>

                <div className='form-control'>
                  <label className='label'>
                    <span className='label-text'>Add some info for your guests:</span>
                  </label>
                  <textarea
                    name='description'
                    value={newEvent.description}
                    onChange={handleChange}
                    maxLength={500}
                    className='textarea textarea-sm textarea-bordered h-24 border-primary'
                    placeholder='Description'
                    required
                  ></textarea>
                </div>
              </div>
              <div className='form-control '>
                {!newEvent.image ? (
                  <div>
                    <form onChange={handleChange} className="flex flex-col items-center" >
                      <label className='label' htmlFor='image'>
                        <span className='label-text align-left'>
                          <span className="text-primary">Enter</span> a keyword in the searchbar,
                          <span className="text-primary"> scroll</span> through the images,
                          <span className="text-primary"> click</span> to select one:
                        </span>
                      </label>
                      <div className='input-group mb-5'>
                      <input
                        type='text'
                        maxLength={50}
                        placeholder='Enter a keyword'
                        onChange={(e) => setSearch(e.target.value)}
                        className='input input-md md:input-sm input-primary w-full'
                      />
                      <button
                        className='btn btn-md md:btn-sm btn-square btn-primary'
                        onClick={(e) => e.preventDefault()}
                      >
                        <FaSearch />
                      </button>
                    </div>
                      <input
                        hidden
                        type='text'
                        name='image'
                        placeholder={newEvent.image}
                        value={newEvent.image}
                        onChange={handleChange}
                        required
                        className='input-md md:input-sm input-bordered  input-primary'
                      />
                      <div className='h-48 carousel carousel-vertical rounded-box w-full max-w-xs'>
                        {images.map((i, idx) => (
                          <div className='carousel-item h-48 ' key={idx}>
                            <img
                              className='w-full '
                              src={i.urls.regular}
                              onClick={() => handleImgClick(i)}
                            />
                          </div>
                        ))}
                      </div>
                    </form>
                  </div>
                ) : (
                  <div>
                    <label className='label' htmlFor='image'>
                      <span className='label-text'>You have selected the image below.</span>
                    </label>
                    <label className='label' >
                      <span className='label-text'> Click again to deselect.</span>
                    </label>
                    <img onClick={clearSelectedImage} src={newEvent.image} />
                  </div>
                )}
              </div>
              <button
                className='btn btn-primary w-full mt-5'
                type='submit'
                disabled={!newEvent.image}
              >
                Submit
              </button>
            </div>
          </form>
        ) : null}
        <form method='dialog'>
        </form>
        <form method='dialog' className='modal-backdrop'>
          <button onClick={handleCancel}>close</button>
        </form>
      </dialog>
    </>
  );
}

export default NewEventModal;
