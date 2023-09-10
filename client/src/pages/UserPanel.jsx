import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from '../components/App';
import { getAllEvents } from '../utilities/events-service';
import { useParams, useNavigate } from 'react-router-dom';
import { showUser } from '../utilities/users-service';
import { useAuth0 } from '@auth0/auth0-react';
import UserPanelAttendingItem from '../components/UserPanelAttendingItem';
import UserPanelCreatedItem from '../components/UserPanelCreatedItem';

export default function UserPanel() {
  const { isLoading } = useAuth0();
  const currUser = useContext(UserContext);
  const routeId = useParams().id;
  const [routeUser, setRouteUser] = useState(null);
  const [created, setCreated] = useState(null);
  const [createdPast, setCreatedPast] = useState(null);
  const [attending, setAttending] = useState(null);
  const [attendingPast, setAttendingPast] = useState(null);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);
  const [activeTab, setActiveTab] = useState(['created', 'active']);
  const navigate = useNavigate();

  async function retrieveUser() {
    try {
      setLoadingEvents(true);
      setLoadingUser(true);
      setActiveTab(['created', 'active']);
      setAttending(null);
      setCreated(null);
      const res = await showUser(routeId);
      if (res._id) {
        setRouteUser(res);
        setLoadingUser(false);
      }
    } catch (err) {
      console.log(err);
      navigate('/*');
    }
  }

  async function retrieveEvents() {
    try {
      if (currUser && routeUser) {
        const allEvents = await getAllEvents({
          userId: routeId,
          filterBy: 'user',
        });
        if (allEvents.length >= 0) {
          const c = [];
          const a = [];
          const cP = [];
          const aP = [];
          const today = new Date().toISOString();
          allEvents.map((event) =>
            event.createdBy === routeId
              ? event.date > today
                ? c.push(event)
                : cP.push(event)
              : event.date > today
              ? a.push(event)
              : aP.push(event)
          );
          setCreated(c);
          setCreatedPast(cP);
          setAttending(a);
          setAttendingPast(aP);
          setLoadingEvents(false);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    retrieveUser();
  }, [routeId]);

  useEffect(() => {
    retrieveEvents();
  }, [currUser, routeUser]);

  function handleClick(e) {
    e.preventDefault();
    let data = [...activeTab];
    if (e.target.id === 'active' || e.target.id === 'past') {
      data[1] = e.target.id;
    } else {
      data[0] = e.target.id;
      data[1] = 'active';
    }
    setActiveTab(data);
  }

  const active = 'tab tab-lifted tab-xl tab-active';
  const inactive = 'tab tab-lifted';

  return (
    <div className='flex flex-col justify-center align-middle items-center w-full mt-5'>
      {!isLoading ? (
        <>
          {currUser ? (
            <>
              {loadingUser ? (
                <div>Loading User Info...</div>
              ) : (
                <div>
                  <p className='text-4xl font-bold'>{routeUser.name}</p>
                  <div className='flex flex-row justify-center  '>
                    <div className='stats shadow-md mx-1'>
                      <div className='avatar'>
                        <div className='w-24 rounded-xl m-3'>
                          <img src={routeUser.picture} alt={routeUser.name} />
                        </div>
                      </div>
                    </div>
                    <div className='hidden sm:stats shadow-md mx-1'>
                      <div className='stat place-items-center'>
                        <div className='stat-title'>Member Since</div>
                        <div className='stat-value'>
                          {new Date(routeUser.createdAt).toLocaleDateString()}
                        </div>
                        <div className='stat-desc'>description</div>
                      </div>
                    </div>
                    <div className='hidden md:stats shadow-md mx-1'>
                      <div className='stat place-items-center'>
                        <div className='stat-title'>Hosted Events</div>
                        <div className='stat-value'>{createdPast?.length}</div>
                        <div className='stat-desc'>description</div>
                      </div>
                    </div>
                    <div className='hidden md:stats shadow-md mx-1'>
                      <div className='stat place-items-center'>
                        <div className='stat-title'>Attended Events</div>
                        <div className='stat-value'>
                          {attendingPast?.length}
                        </div>
                        <div className='stat-desc'>description</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <br />

              <div className='tabs w-full flex flex-row justify-center'>
                <a
                  id='created'
                  className={activeTab[0] === 'created' ? active : inactive}
                  onClick={handleClick}
                >
                  CREATED EVENTS
                </a>
                <a
                  id='attending'
                  className={activeTab[0] === 'attending' ? active : inactive}
                  onClick={handleClick}
                >
                  ATTENDING EVENTS
                </a>
              </div>
              <br />
              <div className='tabs'>
                <a
                  id='active'
                  className={activeTab[1] === 'active' ? active : inactive}
                  onClick={handleClick}
                >
                  ACTIVE
                </a>
                <a
                  id='past'
                  className={activeTab[1] === 'past' ? active : inactive}
                  onClick={handleClick}
                >
                  PAST
                </a>
              </div>

              <br />

              {loadingEvents ? (
                <div className='flex flex-col justify-center align-middle items-center w-3/4 lg:w-1/2'>
                  Loading Events...
                </div>
              ) : (
                <div className='flex flex-col justify-center align-middle items-center  w-3/4'>
                  <section
                    hidden={
                      !(activeTab[0] === 'created' && activeTab[1] === 'active')
                    }
                  >
                    {created.length ? (
                      <>
                        {created.map((event) => (
                          <UserPanelCreatedItem
                            key={event._id}
                            event={event}
                            currUser={currUser}
                            routeId={routeId}
                            retrieveEvents={retrieveEvents}
                            past={false}
                          />
                        ))}
                      </>
                    ) : (
                      <div>Not hosting any event yet.</div>
                    )}
                  </section>

                  <section
                    hidden={
                      !(activeTab[0] === 'created' && activeTab[1] === 'past')
                    }
                  >
                    {createdPast.length ? (
                      <>
                        {createdPast.map((event) => (
                          <UserPanelCreatedItem
                            key={event._id}
                            event={event}
                            currUser={currUser}
                            routeId={routeId}
                            retrieveEvents={retrieveEvents}
                            past={true}
                          />
                        ))}
                      </>
                    ) : (
                      <div>Not hosted any event yet.</div>
                    )}
                  </section>

                  <section
                    hidden={
                      !(
                        activeTab[0] === 'attending' &&
                        activeTab[1] === 'active'
                      )
                    }
                  >
                    {attending.length ? (
                      <>
                        {attending.map((event) => (
                          <UserPanelAttendingItem
                            key={event._id}
                            event={event}
                            currUser={currUser}
                            routeId={routeId}
                            retrieveEvents={retrieveEvents}
                            past={false}
                          />
                        ))}
                      </>
                    ) : (
                      <div>Not attending any event yet.</div>
                    )}
                  </section>

                  <section
                    hidden={
                      !(activeTab[0] === 'attending' && activeTab[1] === 'past')
                    }
                  >
                    {attendingPast.length ? (
                      <>
                        {attendingPast.map((event) => (
                          <UserPanelAttendingItem
                            key={event._id}
                            event={event}
                            currUser={currUser}
                            routeId={routeId}
                            retrieveEvents={retrieveEvents}
                            past={true}
                          />
                        ))}
                      </>
                    ) : (
                      <div>Not attended any event yet.</div>
                    )}
                  </section>
                </div>
              )}
            </>
          ) : (
            <div>Log in to see info</div>
          )}
        </>
      ) : (
        <div>Loading Content...</div>
      )}
    </div>
  );
}
