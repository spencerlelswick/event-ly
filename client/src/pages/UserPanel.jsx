import React, { useEffect } from 'react';
import { useContext, useState } from 'react';
import { UserContext } from '../components/App';
import { getAllEvents } from '../utilities/events-service';
import { useParams } from "react-router-dom";
import { showUser } from '../utilities/users-service';
import { useAuth0 } from "@auth0/auth0-react"

export default function UserPanel() {
  const {isLoading } = useAuth0()
  const currUser = useContext(UserContext)
  const routeId = useParams().id
  const [routeUser, setRouteUser] = useState(null)
  const [createdEvents, setCreatedEvents] = useState(null)
  const [attendingEvents, setAttendingEvents] = useState(null)
  const [loadingEvents, setLoadingEvents] = useState(true)
  const [loadingUser, setLoadingUser] = useState(true)

  async function retrieveUser() {
    try {
      if (currUser) {
        if (currUser.ID === routeId) {
          setRouteUser({
            name: currUser.NAME,
            picture: currUser.PIC,
            _id: currUser.ID
          })
          setLoadingUser(false)
        } else {
          const res = await showUser(routeId)
          if (res._id) {
            setRouteUser(res)
            setLoadingUser(false)
          }
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  async function retrieveEvents() {
    try {
      if (currUser && routeUser) {
        const allEvents = await getAllEvents({ userId: routeId, filterBy: "user" })
        if (allEvents.length >= 0) {
          const created = []
          const attending = []
          allEvents.map((event) => (
            event.createdBy === routeId ? created.push(event) : attending.push(event)
          ))
          setCreatedEvents(created)
          setAttendingEvents(attending)
          setLoadingEvents(false)
        }
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    retrieveUser()
  }, [currUser, routeId])

  useEffect(() => {
    retrieveEvents()
  }, [routeUser])

  async function handleRemove(e){
    try{
        e.preventDefault()
        const data = [...event.guests]
        const idx = data.indexOf(data.find((g)=>(g._id === currUser.ID)))
        data.splice(idx,1)
        const updatedEvent = await updateEvent(event._id, {guests: data})
        if (updatedEvent._id){
            setEvent(updatedEvent)
        }else {
            throw Error("Something went wrong with removing a guest.")
        }
    }catch(err){    
        console.log(err)
    }
}




  return (
    <div>
      <h1>USER PANEL</h1>
      {!isLoading ? (<>
        {currUser ? (
          <>
            {loadingUser ? (
              <div>Loading User Info...</div>
            ) : (
              <div>
                <img src={routeUser.picture} alt={routeUser.name} className='w-20'/>
                <div>{routeUser.name}</div>
              </div>
            )}

            <hr />

            {loadingEvents ? (
              <div>Loading Events...</div>
            ) : (
              <>
                <h1>CREATED EVENTS</h1>
                {createdEvents.length ? (
                  <>
                    {createdEvents.map((event) => (
                      <div key={event._id}>
                        <br />
                        <div>{event.name}</div>
                        <img src={event.image} alt={event.name} className=' w-20' />
                        <div>Description: {event.description}</div>
                        <div>Address: {event.address}</div>
                        <div>Location: {event.location}</div>
                        <div>Date: {event.date}</div>
                        <div>Category: {event.category}</div>
                        {currUser.ID === routeId ? (
                          <button className='btn btn-secondary'>Delete event</button>
                        ) : (
                          null
                        )}
                      </div>
                    ))}
                  </>
                ) : (
                  <div>Not hosting any event yet.</div>
                )}

                <hr />
                <h1>ATTENDING EVENTS</h1>
                {attendingEvents.length ? (
                  <>
                    {attendingEvents.map((event) => (
                      <div key={event._id}>
                        <div>{event.name}</div>
                        <img src={event.image} alt={event.name} className=' w-20' />
                        <div>Description: {event.description}</div>
                        <div>Address: {event.address}</div>
                        <div>Location: {event.location}</div>
                        <div>Date: {event.date}</div>
                        <div>Category: {event.category}</div>
                        {currUser.ID === routeId ? (
                          <button className='btn btn-secondary'>Remove me</button>
                        ) : (
                          null
                        )}
                      </div>
                    ))}
                  </>
                ) : (
                  <div>Not attending any event yet.</div>
                )}

              </>
            )}
          </>
        ) : (
          <div>Log in to see info</div>
        )}
      </>
      ) :
        <>Loading Content...</>
      }
    </div>
  );
};


