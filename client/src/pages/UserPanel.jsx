import React, { useEffect } from 'react';
import { showUser } from '../utilities/users-service';
import { useContext, useState } from 'react';
import { UserContext } from '../components/App';
import { getAllEvents } from '../utilities/events-service';
import { useParams } from "react-router-dom";

export default function UserPanel() {
  const currUser = useContext(UserContext)
  const routeParams = useParams()
  const [createdEvents, setCreatedEvents] = useState(null)
  const [attendingEvents, setAttendingEvents] = useState(null)
  const [loadingEvents, setLoadingEvents] = useState(true)


  async function retrieveEvents() {
    try {
      if (currUser) {
        const userId = routeParams.id
        const allEvents = await getAllEvents({ userId: userId, filterBy: "user" })
        if (allEvents.length >= 0) {
          const created = []
          const attending = []
          allEvents.map((event) => (
            event.createdBy === userId ? created.push(event) : attending.push(event)
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
    retrieveEvents()
  }, [currUser])

  return (
    <div>
      <h1>USER PANEL</h1>
      {currUser ? (
        <>
          <img src={currUser.PIC} />
          <div>{currUser.NAME}</div>
          <hr />


          {loadingEvents ? (
            <div>Loading Created Events...</div>
          ) : (
            <>
              <h1>CREATED EVENTS</h1>
              {createdEvents.length ? (
                <>
                  {createdEvents.map((event) => (
                    <div key={event._id}>
                      <div>{event.name}</div>
                      <img src={event.image} alt={event.name} className=' w-20' />
                      {console.log(event)}
                    </div>
                  ))}
                </>
              ) : (
                <div>You don't have any created event. Plan something!</div>
              )}

              <hr />
              <h1>ATTENDING EVENTS</h1>
                {attendingEvents.length ? (
                  <>
                    {attendingEvents.map((event) => (
                      <div key={event._id}>
                        <div>{event.name}</div>
                        <img src={event.image} alt={event.name} className=' w-20' />
                      </div>
                    ))}
                  </>
                ) : (
                  <div>Seems like you are not partecipating at any events. Go explore events in your area!</div>
                )}
            </>
          )}
        </>
      ) : (
        <div>Loading Content...</div>
      )}
    </div>
  );
};


