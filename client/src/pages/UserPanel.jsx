import React, { useEffect } from 'react';
import { showUser } from '../utilities/users-service';
import { useContext, useState } from 'react';
import { UserContext } from '../components/App';

export default function UserPanel() {
  const currUser = useContext(UserContext)
  const [userInfo, setUserInfo] = useState(null)

  async function retrieveUser(){
    try{
      if (currUser){
      const data = await showUser(currUser)
      console.log("data",data)
      setUserInfo(data)
      console.log(userInfo)
      }
    }catch (err){
      console.log(err)
    }
  }

  useEffect(()=>{
    retrieveUser()
  },[currUser])

  return (
    <div>

      <h1>USER PANEL</h1>
      {userInfo ? (
        <div>{userInfo.name} </div>
      ):(null)}



    </div>
  );
};


