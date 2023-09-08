import React, { useEffect, useState, createContext} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Error from '../pages/Error';
import UserPanel from '../pages/UserPanel';
import Header from './Header';
import { useAuth0 } from "@auth0/auth0-react"
import { createUser } from '../utilities/users-service';

const UserContext = createContext()

const App = () => {

  const { user, isAuthenticated, isLoading } = useAuth0() 
  const [currUser, setCurrUser] = useState(false)

  async function handleAuthUser(){
    if (isAuthenticated){
    const data = { 
      name: user.given_name ? user.name : user.nickname ,
      picture : user.picture,
      email : user.email,
    }
    const newUser = await createUser(data)
    setCurrUser({ID:newUser._id, PIC: newUser.picture, NAME: newUser.name})
    //localStorage.setItem("USER_ID", newUser._id)
    }
  }

  useEffect(()=>{
    handleAuthUser()
  },[isAuthenticated])
 
  return (
    <div className=''>
        <UserContext.Provider value={currUser}>
          <Header/>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/user/:id' element={<UserPanel />} />
            <Route path='/*' element={<Error />} />
          </Routes>
        </UserContext.Provider>

    </div>
  );
};

export default App;
export {UserContext}