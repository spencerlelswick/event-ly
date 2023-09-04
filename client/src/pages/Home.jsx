import React from 'react';
import Map from '../components/Map';
import RightDrawer from '../components/RightDrawer';
import RightDrawerCollapsed from '../components/RightDrawerCollapsed';
import { useState } from 'react';

const Home = () => {

  const [eventsList, setEventsList] = useState(null)
  const [coordinates, setCoordinates] = useState([38.21363852151677, -85.58345588638122])

  return (
    <div style={{ height: '95vh' }} className='sm:text-2xl '>
      <RightDrawer coordinates={coordinates} eventsList={eventsList} setEventsList={setEventsList}/>
      <RightDrawerCollapsed/>
      <Map setCoordinates={setCoordinates} eventsList={eventsList}/>
    </div>
  );
};

export default Home;
