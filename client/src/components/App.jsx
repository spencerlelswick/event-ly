import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Error from '../pages/Error';
import Header from './Header';
import { useAuth0 } from "@auth0/auth0-react"
import { createUser } from '../utilities/users-service';

const App = () => {

  const { user, isAuthenticated, isLoading } = useAuth0()  
 
  async function handleAuthUser(){
    if (isAuthenticated){
    const data = {
      name: user.given_name ? user.name : user.nickname ,
      picture : user.picture,
      email : user.email,
    }
    const newUser = await createUser(data)
    user._id = newUser._id
    user.favCategory = newUser.favCategory
    user.name = newUser.name
    }
  }
  
  useEffect(()=>{
    handleAuthUser()
  },[isAuthenticated])
 
  return (
    <div className=''>

      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/*' element={<Error />} />
      </Routes>
    </div>
  );
};

export default App;
