import React, { useState, useEffect } from 'react';
import Map from '../components/Map';
import EventsList from '../components/EventsList';
import EventsListCollapsed from '../components/EventsListCollapsed';
import LeftDrawer from '../components/LeftDrawer';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllEvents } from '../utilities/events-service';
import { initFilter } from '../utilities/category';
import { sortEvents } from '../utilities/sortEvents';

const Home = ({pannedEvent,setPannedEvent}) => {
  const [eventsList, setEventsList] = useState(null);
  const [coordinates, setCoordinates] = useState([0, 0]);
  const [point, setPoint] = useState(null);
  const [loadingEventsList, setLoadingEventList] = useState(true);
  const [eventFilter, setEventFilter] = useState(initFilter());
  const [sorted, setSorted] = useState('date');
  const [isShowListView, setIsShowListView] = useState(false);

  useEffect(() => {
    document.getElementsByClassName(
      'leaflet-control-attribution'
    )[0].style.display = 'none';
  }, []);

  function displayToast(msg) {
    toast.success(`${msg} was added successfully!`, {
      position: 'top-left',
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
      const eventsResponse = await getAllEvents({
        coordinates: coordinates,
        filterBy: 'coord',
      });
      if (eventsResponse.length || eventsResponse.length === 0) {
        let newList = eventsResponse;
        if (sorted !== 'date') {
          newList = sortEvents(eventsResponse, coordinates, sorted);
        }
        setEventsList(newList);
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

  useEffect(() => {
    if (eventsList?.length && eventsList.length > 1) {
      const data = [...eventsList];
      const list = sortEvents(data, coordinates, sorted);
      setEventsList(list);
    }
  }, [sorted]);

  return (
    <div className='flex flex-row'>
      <div className='w-full  h-[95vh] md:w-3/5 border-r-[1px] border-secondary'>
        <Map
          setCoordinates={setCoordinates}
          eventsList={eventsList}
          point={point}
          setPoint={setPoint}
          pannedEvent={pannedEvent}
          setPannedEvent={setPannedEvent}
          eventFilter={eventFilter}
        />
        {point && (
          <LeftDrawer
            point={point}
            setPoint={setPoint}
            displayToast={displayToast}
            fetchEvents={fetchEvents}
          />
        )}
      </div>
      <div>
        <EventsList
          eventsList={eventsList}
          setPannedEvent={setPannedEvent}
          loadingEventsList={loadingEventsList}
          eventFilter={eventFilter}
          setEventFilter={setEventFilter}
          setSorted={setSorted}
          isShowListView={isShowListView}
          setIsShowListView={setIsShowListView}
        />
        <EventsListCollapsed
          setIsShowListView={setIsShowListView}
          isShowListView={isShowListView}
        />
{console.log(coordinates)}
        <ToastContainer transition={Slide} />
      </div>
    </div>
  );
};

export default Home;
