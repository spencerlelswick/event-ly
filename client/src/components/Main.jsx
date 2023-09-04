import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Error from '../pages/Error';
import EventsForm from './EventsForm';

const Main = () => {
  return (
    <div style={{ height: '95vh' }} className=''>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/event' element={<EventsForm />} />
        <Route path='/*' element={<Error />} />
      </Routes>
    </div>
  );
};

export default Main;
