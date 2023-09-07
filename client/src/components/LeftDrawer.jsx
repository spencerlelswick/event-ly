import NewEventModal from './NewEventModal';
import { useAuth0 } from "@auth0/auth0-react"
import LoginButton from './Auth/LoginButton';

export default function LeftDrawer({ point, setPoint, displayToast }) {
  const { user, isAuthenticated, isLoading } = useAuth0()
  return (
    <div className='h-1/6 w-3/5 flex flex-col justify-center items-center z-10 bg-white absolute bottom-0 border-t-1 border-primary left-auto'>
      {
        <>
          <h2>Nice! You've found a spot, create an event?</h2>
          <div className='mt-5'>

          {isAuthenticated ? (
            <NewEventModal
              point={point}
              displayToast={displayToast}
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
