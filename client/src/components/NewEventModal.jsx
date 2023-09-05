import { useEffect, useState } from 'react';
import latLngToAddress from '../util/geocode';
import Datepicker from 'tailwind-datepicker-react';

function NewEventModal({ point }) {
  const [address, setAddress] = useState('Address not set.');
  const [show, setShow] = useState(false);
  const handleChange = (selectedDate) => {
    console.log(selectedDate);
  };
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
      background: '',
      todayBtn: '',
      clearBtn: '',
      icons: '',
      text: '',
      disabledText: 'bg-gray-100',
      input: '',
      inputIcon: '',
      selected: '',
    },
    icons: {
      // () => ReactElement | JSX.Element
      prev: () => <span>Previous</span>,
      next: () => <span>Next</span>,
    },
    datepickerClassNames: 'top-12',
    defaultDate: new Date(Date.now()),
    language: 'en',
  };

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
        onClick={() => document.getElementById('event_modal').showModal()}
        className='btn btn-active btn-primary'
      >
        Add Event
      </button>
      <dialog id='event_modal' className='modal'>
        <form
          method='dialog'
          className='modal-box flex flex-col justify-center align-middle items-center'
        >
          <div className='form-control w-full max-w-xs'>
            <p className='text-sm'>Confirm address:</p>
            <p className='text-2xl'>{`${address.name}`}</p>
            <label className='label'>
              <span className='label-text'>Name your event:</span>
            </label>
            <input
              type='text'
              placeholder='Type here'
              className='input input-bordered w-full max-w-xs input-primary'
            />

            <label className='label'>
              <span className='label-text'>Type:</span>
            </label>
            <input
              type='text'
              placeholder='Type here'
              className='input input-bordered w-full max-w-xs input-primary'
            />

            <label className='label'>
              <span className='label-text'>Date:</span>
            </label>
            <Datepicker
              options={options}
              onChange={handleChange}
              show={show}
              setShow={handleClose}
            />

            <label className='label'>
              <span className='label-text'>Describe the event:</span>
            </label>
            <input
              type='text'
              placeholder='Type here'
              className='input input-bordered w-full max-w-xs input-primary'
            />

            <button className='btn btn-primary mt-5'>Submit</button>
            <button className='btn btn-outline btn-secondary mt-1'>
              Cancel
            </button>
          </div>
        </form>
        <form method='dialog' className='modal-backdrop'>
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

export default NewEventModal;
