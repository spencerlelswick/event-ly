import { useEffect, useState } from 'react';
import latLngToAddress from '../util/geocode';
import Datepicker from 'tailwind-datepicker-react';
import { createEvent } from '../utilities/events-service';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth0 } from "@auth0/auth0-react"

function NewEventModal({ point, displayToast }) {
  const { user, isAuthenticated, isLoading } = useAuth0()
  
  const initState = {
    name: '',
    coordinates: point,
    category: '1',
    location: '',
    date: '',
    image: 'https://picsum.photos/200/320',
    title: '',
    description: '',
    createdBy: user._id
  };
  const [newEvent, setNewEvent] = useState(initState);
  const [address, setAddress] = useState('Address not set.');
  const [show, setShow] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleClose = (state) => {
    setShow(state);
  };

  const minDate = new Date();
  minDate.setDate(minDate.getDate() - 1);

  const options = {
    title: 'Event Date',
    autoHide: true,
    todayBtn: false,
    clearBtn: true,
    maxDate: new Date('2030-01-01'),
    minDate: new Date(minDate),
    theme: {
      border: '',
      background: '',
      todayBtn: '',
      clearBtn: '',
      icons: '',
      text: '',
      disabledText: 'bg-gray-100',
      input: 'border-primary border-[1px] border-solid',
      inputIcon: '',
      selected: '',
    },
    icons: {
      prev: () => <span>Previous</span>,
      next: () => <span>Next</span>,
    },
    datepickerClassNames: 'top-12',
    defaultDate: new Date(Date.now()),
    language: 'en',
  };

  function handleChange(e) {
    const updatedData = {
      ...newEvent,
      address: address.name,
      coordinates: point,
      [e.target.name]: e.target.value,
    };
    console.log(updatedData);
    setNewEvent(updatedData);
  }

  function handleCancel() {
    setNewEvent(initState);
    setIsModalOpen(false);
  }

  function handleDateChange(e) {
    console.log(e);
    const updatedData = { ...newEvent, date: e };
    setNewEvent(updatedData);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    displayToast(`${newEvent.name} has been added!`);
    await createEvent(newEvent);
    setNewEvent(initState);
    setIsModalOpen(false);
  }

  async function getAddress() {
    try {
      const geocodeLatLon = await latLngToAddress(point[0], point[1]);
      setAddress(geocodeLatLon);
      // setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getAddress();
  }, [point]);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className='btn btn-active btn-primary'
      >
        Add Event
      </button>
      <dialog id='event_modal' className='modal' open={isModalOpen}>
        <form
          onSubmit={handleSubmit}
          method='dialog'
          className='modal-box flex flex-col justify-center align-middle items-center'
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
                <option value={'1'}>Art</option>
                <option value={'2'}>Business</option>
                <option value={'3'}>Exercise</option>
                <option value={'4'}>Food</option>
                <option value={'5'}>Games</option>
                <option value={'6'}>Language</option>
                <option value={'7'}>Music</option>
                <option value={'8'}>Party</option>
                <option value={'9'}>Politics</option>
                <option value={'10'}>Science</option>
                <option value={'11'}>Sport</option>
                <option value={'12'}>Tech</option>
              </select>
            </div>

            <div className='form-control w-full max-w-xs'>
              <label className='label' htmlFor='date'>
                <span className='label-text'>Date:</span>
              </label>
              <Datepicker
                name='date'
                value={newEvent.date}
                options={options}
                onChange={handleDateChange}
                show={show}
                setShow={handleClose}
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
              ></textarea>
            </div>
            <input type='submit' className='btn btn-primary mt-5' />
          </div>
        </form>
        <form method='dialog' className='modal-backdrop'>
          <button onClick={handleCancel}>close</button>
        </form>
      </dialog>
    </>
  );
}

export default NewEventModal;
