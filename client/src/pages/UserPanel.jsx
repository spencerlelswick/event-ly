import React, { useEffect } from 'react';
import { showUser } from '../utilities/users-service';
import { useContext, useState } from 'react';
import { UserContext } from '../components/App';
import { getAllEvents } from '../utilities/events-service';

export default function UserPanel() {
  const currUser = useContext(UserContext)
  const [userEvents, setUserEvents] = useState(null)

  async function retrieveEvents(){
    try{
      if (currUser){
      const data = await getAllEvents({userId: currUser.ID, filterBy: "user"})
      console.log("data",data)
  
      }
    }catch (err){
      console.log(err)
    }
  }

  useEffect(()=>{
    retrieveEvents()
  },[currUser])

  return (
    <div>

      <h1>USER PANEL</h1>
      {currUser ? (
        <>
          <img src={currUser.PIC}/>
          <div>{currUser.NAME}</div>
        </>

      ): (
        <div>Loading Content</div>
      )}



    </div>
  );
};


