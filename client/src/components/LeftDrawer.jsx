import NewEventModal from './NewEventModal';
import LoginButton from './LoginButton';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from './App';
import latLngToAddress from '../utilities/geocode';

export default function LeftDrawer({
  point,
  setPoint,
  displayToast,
  fetchEvents,
}) {
  const currUser = useContext(UserContext);
  const [address, setAddress] = useState(false);
  const [loadingAddress, setLoadingAddress] = useState(true)

  async function getAddress() {
    try {
      setLoadingAddress(true)
      setAddress(false)
      const geocodeLatLon = await latLngToAddress(point[0], point[1]);
      setAddress(geocodeLatLon)
      setLoadingAddress(false)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getAddress();
  }, [point]);

  return (
    <div className='w-full sm:w-3/5 flex flex-col justify-center items-center z-10 bg-white absolute bottom-0 border-t-1 border-primary left-auto'>
      {
        <>
          <div className='flex h-1/5 w-3/5 justify-between'>
            <div className='hidden md:visible justify-center items-center'>
              <img src='/assets/evently-logo.png' className='w-3/5 h-auto' />
            </div>
            <div className='w-full'>
              <div>
              {!loadingAddress ? (
                <div >
                {address ? (
                  <div className='h-1/6 w-3/5'>
                    <h2>Nice! You've found a spot:</h2>
                    <p className='min-w-full'>{address.name}</p>
                  </div>
                ) : (
                  <div className='h-1/6 w-3/5'>
                    <h2>We can't find an address there.</h2>
                    <h2>Please find a different spot.</h2>
                  </div>
                )}
              </div>
              ):(
                <div className='h-1/6 w-3/5'>
                    <h2>Looking for an address...</h2>
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
                ) : (
                  <>
                    <h2>Log in to create an event</h2>
                    <LoginButton />
                  </>
                )}

                <button
                  onClick={() => {
                    setPoint(null);
                  }}
                  className='btn btn-secondary ml-2'
                >
                  cancel
                </button>
              </div>
            </div>
          </div>
        </>
      }
    </div>
  );
}
