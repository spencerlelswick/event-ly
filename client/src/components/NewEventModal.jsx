import AddressSearch from './AddressSearch';

export default function NewEventModal() {
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
            <AddressSearch />
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
