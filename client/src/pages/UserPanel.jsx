import React, { useEffect } from 'react';
import { showUser } from '../utilities/users-service';
import { useContext, useState } from 'react';
import { UserContext } from '../components/App';
import { getAllEvents } from '../utilities/events-service';

export default function UserPanel() {
  const currUser = useContext(UserContext)
  const [createdEvents, setCreatedEvents] = useState(null)
  const [loadingCreated, setLoadingCreated] = useState(true)
  const [attendingEvents, setAttendingEvents] = useState(null)
  const [loadingAttending, setLoadingAttending] = useState(true)

  async function retrieveEvents() {
    try {
      if (currUser) {
        const created = await getAllEvents({ userId: currUser.ID, filterBy: "created" })
        const attending = await getAllEvents({ userId: currUser.ID, filterBy: "guest" })
        if (created.length >= 0) {
          setCreatedEvents(created)
          setLoadingCreated(false)
        }
        if (attending.length >= 0) {
          setAttendingEvents(attending)
          setLoadingAttending(false)
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
          <h1>EVENTS YOU CREATED</h1>

          {loadingCreated ? (
            <div>Loading Created Events...</div>
          ) : (
            <>
              {createdEvents.length ? (
                <>
                  {createdEvents.map((event) => (
                    <div key={event._id}>
                      <div>{event.name}</div>
                      <img src={event.image} alt={event.name} className=' w-20' />
                    </div>
                  ))}
                </>
              ) : (
                <div>You don't have any created event. Plan something!</div>
              )}
            </>
          )}

          <hr />
          <h1>EVENTS YOU WANT TO ATTEND</h1>

          {loadingAttending ? (
            <div>Loading Attending Events...</div>
          ) : (
            <>
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


