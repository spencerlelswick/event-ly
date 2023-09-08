import React, { useState, useEffect } from 'react';
import Map from '../components/Map';
import RightDrawer from '../components/RightDrawer';
import RightDrawerCollapsed from '../components/RightDrawerCollapsed';
import LeftDrawer from '../components/LeftDrawer';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllEvents } from '../utilities/events-service';

const Home = () => {
  const [eventsList, setEventsList] = useState(null);
  const [coordinates, setCoordinates] = useState([
    38.21363852151677, -85.58345588638122,
  ]);
  const [point, setPoint] = useState(null);
  const [pannedEvent, setPannedEvent] = useState(null);
  const [loadingEventsList, setLoadingEventList] = useState(true);

  function displayToast(msg) {
    toast.success(`${msg} was added successfully!`, {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  }

  async function fetchEvents() {
    try {
      const eventsResponse = await getAllEvents({coordinates:coordinates, filterBy:"coord"});
      if (eventsResponse.length || eventsResponse.length === 0) {
        setEventsList(eventsResponse);
        setLoadingEventList(false);
      } else {
        throw Error('Something went wrong with retrieving events.');
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchEvents();
  }, [coordinates]);


  return (
    <div style={{ height: '95vh' }} className='sm:text-2xl '>
      <RightDrawer
        coordinates={coordinates}
        eventsList={eventsList}
        setEventsList={setEventsList}
        point={point}
        setPannedEvent={setPannedEvent}
        fetchEvents={fetchEvents}
        loadingEventsList={loadingEventsList}
      />
      <RightDrawerCollapsed />

      {point && (
        <LeftDrawer
          point={point}
          setPoint={setPoint}
          displayToast={displayToast}
          fetchEvents={fetchEvents}
        />
      )}
      <Map
        setCoordinates={setCoordinates}
        eventsList={eventsList}
        point={point}
        setPoint={setPoint}
        pannedEvent={pannedEvent}
        setPannedEvent={setPannedEvent}
      />
      <ToastContainer transition={Slide} />
    </div>
  );
};

export default Home;
