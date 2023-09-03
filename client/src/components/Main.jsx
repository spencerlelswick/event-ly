import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Error from '../pages/Error';

const Main = () => {
  return (
    <div className='bg-green-500 flex-grow'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/*' element={<Error />} />
      </Routes>
    </div>
  );
};

export default Main;
