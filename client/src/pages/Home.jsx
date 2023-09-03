import React from 'react';

const Home = () => {
  return (
    <div className='bg-lime-700 sm:text-2xl '>
      <div className='invisible sm:visible absolute bg-yellow-600 right-0 h-screen w-40'>
        List displayed here in a drawer
      </div>
      <div className='sm:invisible absolute bg-yellow-400 right-10 bottom-10 h-20 w-20 rounded-full flex justify-center items-center'>
        list
      </div>
      <div className='absolute bg-violet-400 left-0 h-screen w-10 md:w-40 '>
        left drawer
      </div>
      <div className='flex justify-center items-center h-screen'>map here</div>
    </div>
  );
};

export default Home;
