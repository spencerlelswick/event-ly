import React, { useState, useEffect } from 'react';
import Map from '../components/Map';
import EventsList from '../components/EventsList';
import EventsListCollapsed from '../components/EventsListCollapsed';
import LeftDrawer from '../components/LeftDrawer';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllEvents } from '../utilities/events-service';
import { initFilter } from '../utilities/category';

const Home = () => {
  const [eventsList, setEventsList] = useState(null);
  const [coordinates, setCoordinates] = useState([
    38.21363852151677, -85.58345588638122,
  ]);
  const [point, setPoint] = useState(null);
  const [pannedEvent, setPannedEvent] = useState(null);
  const [loadingEventsList, setLoadingEventList] = useState(true);
  const [eventFilter, setEventFilter] = useState(initFilter());

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

  function calcDist(ev) {
    return (
      (ev.coordinates.latitude - coordinates[0]) ** 2 +
      (ev.coordinates.longitude - coordinates[1]) ** 2
    );
  }

  async function fetchEvents() {
    try {
      const eventsResponse = await getAllEvents({
        coordinates: coordinates,
        filterBy: 'coord',
      });
      if (eventsResponse.length || eventsResponse.length === 0) {
        const sorted = eventsResponse.sort((a, b) =>
          calcDist(a) < calcDist(b) ? -1 : 1
        );

        setEventsList(sorted);
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
      <EventsList
        coordinates={coordinates}
        eventsList={eventsList}
        setEventsList={setEventsList}
        point={point}
        setPannedEvent={setPannedEvent}
        fetchEvents={fetchEvents}
        loadingEventsList={loadingEventsList}
        eventFilter={eventFilter}
        setEventFilter={setEventFilter}
      />
      <EventsListCollapsed />

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
        eventFilter={eventFilter}
      />
      <ToastContainer transition={Slide} />
    </div>
  );
};

export default Home;
