import React from 'react';
import Map from '../components/Map';
import RightDrawer from '../components/RightDrawer';
import RightDrawerCollapsed from '../components/RightDrawerCollapsed';
import { useState, useEffect } from 'react';
import LeftDrawer from '../components/LeftDrawer';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [eventsList, setEventsList] = useState(null);
  const [coordinates, setCoordinates] = useState([
    38.21363852151677, -85.58345588638122,
  ]);
  const [point, setPoint] = useState(null);
  const [pannedEvent, setPannedEvent] = useState(null);

  useEffect(() => {
    displayToast('test');
  }, []);

  function displayToast(msg) {
    toast.success(`${msg} was added successfully!`, {
      position: 'bottom-right',
      autoClose: 30000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  }

  return (
    <div style={{ height: '95vh' }} className='sm:text-2xl '>
      <RightDrawer
        coordinates={coordinates}
        eventsList={eventsList}
        setEventsList={setEventsList}
        point={point}
        setPannedEvent={setPannedEvent}
      />
      <RightDrawerCollapsed />

      {point && (
        <LeftDrawer
          point={point}
          setPoint={setPoint}
          displayToast={displayToast}
        />
      )}
      <Map
        setCoordinates={setCoordinates}
        eventsList={eventsList}
        point={point}
        setPoint={setPoint}
        pannedEvent={pannedEvent}
      />
      <ToastContainer transition={Slide} />
    </div>
  );
};

export default Home;
