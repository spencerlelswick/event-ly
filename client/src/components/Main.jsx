import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const Main = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<People />} />

        <Route path='/*' element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default Main;
