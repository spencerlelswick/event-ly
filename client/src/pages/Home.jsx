import React from 'react';
import Map from '../components/Map';
import Events from '../components/Events';

const Home = () => {
  return (
    <div className='sm:text-2xl h-full'>
      <div
        style={{ height: '95vh' }}
        className='z-10 invisible sm:visible absolute bg-yellow-600 right-0 w-2/5 overflow-auto'
      >
        Event List:
        <Events />
      </div>
      <div className='z-10 sm:invisible absolute bg-yellow-400 right-10 bottom-10 h-20 w-20 rounded-full flex justify-center items-center'>
        list
      </div>
      {/* <div className='z-10 absolute bg-violet-400 left-0 h-screen w-10 md:w-40 '>
        left drawer
      </div> */}
      <div className='flex justify-center items-center h-full'>
        <Map />
      </div>
    </div>
  );
};

export default Home;
