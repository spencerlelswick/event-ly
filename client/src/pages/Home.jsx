import React from 'react';
import Map from '../components/Map';
import RightDrawer from '../components/RightDrawer';
import RightDrawerCollapsed from '../components/RightDrawerCollapsed';
import { useState } from 'react';
import LeftDrawer from '../components/LeftDrawer';

const Home = () => {
  const [eventsList, setEventsList] = useState(null);
  const [coordinates, setCoordinates] = useState([
    38.21363852151677, -85.58345588638122,
  ]);
  const [point, setPoint] = useState(null);

  return (
    <div style={{ height: '95vh' }} className='sm:text-2xl '>
      <RightDrawer
        coordinates={coordinates}
        eventsList={eventsList}
        setEventsList={setEventsList}
        point={point}
      />
      <RightDrawerCollapsed />
      {point && <LeftDrawer point={point} setPoint={setPoint} />}
      <Map
        setCoordinates={setCoordinates}
        eventsList={eventsList}
        point={point}
        setPoint={setPoint}
      />
    </div>
  );
};

export default Home;
