import NewEventModal from './NewEventModal';
import LoginButton from './LoginButton';
import { useContext } from 'react';
import { UserContext } from './App';

export default function LeftDrawer({ point, setPoint, displayToast, fetchEvents }) {
  const currUser = useContext(UserContext)

  return (
    <div className='h-1/6 w-3/5 flex flex-col justify-center items-center z-10 bg-white absolute bottom-0 border-t-1 border-primary left-auto'>
      {
        <>
          <img src="../../public/assets/evently-logo.png" className="absolute left-5 bottom-0" />
          
          <h2>Nice! You've found a spot, create an event?</h2>
          <div className='mt-5'>

          {currUser ? (
            <NewEventModal
              point={point}
              displayToast={displayToast}
              fetchEvents={fetchEvents}
              className=''
            />
            ):
            <>
              <h2>Log in to create an event</h2>
              <LoginButton/>
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
