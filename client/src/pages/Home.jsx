import React from 'react';
import Map from '../components/Map';
import RightDrawer from '../components/RightDrawer';
import RightDrawerCollapsed from '../components/RightDrawerCollapsed';

const Home = () => {

  return (
    <div style={{ height: '95vh' }} className='sm:text-2xl '>
      <RightDrawer/>
      <RightDrawerCollapsed/>
      <Map />
    </div>
  );
};

export default Home;
