import NewEventModal from './NewEventModal';
import LoginButton from './LoginButton';
import { useContext, useState } from 'react';
import { UserContext } from './App';

export default function LeftDrawer({ point, setPoint, displayToast, fetchEvents }) {
  const currUser = useContext(UserContext)
  const [address, setAddress] = useState('Address not set.');

  return (
    <div className='h-1/6 w-3/5 flex flex-col justify-center items-center z-10 bg-white absolute bottom-0 border-t-1 border-primary left-auto'>
      {
        <>
          <div className='flex flex-row h-1/5 w-full justify-between'>
            <div>
            <img src="/assets/evently-logo.png" className="w-3/5 h-auto" />
            </div>
            {address ? (
              <div className='h-1/6 w-3/5'>
                <h2>Nice! You've found a spot:</h2>
                <h2>{address.name}.</h2>
              </div>
            ) : (
              <div className='h-1/6 w-3/5'>
                <h2>We can't find an address at that location.</h2>
                <h2>Please find a different spot.</h2>
              </div>
            )}
          </div>


          <div className='mt-5'>

            {currUser ? (
              <NewEventModal
                point={point}
                displayToast={displayToast}
                fetchEvents={fetchEvents}
                address={address}
                setAddress={setAddress}
                className=''
              />
            ) :
              <>
                <h2>Log in to create an event</h2>
                <LoginButton />
              </>
            }

            <button
              onClick={() => {
                setPoint(null);
              }}
              className='btn btn-secondary ml-2'
            >
              cancel
            </button>
          </div>
        </>
      }
    </div>
  );
}
