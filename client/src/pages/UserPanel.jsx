import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from '../components/App';
import { getAllEvents } from '../utilities/events-service';
import { useParams, useNavigate } from 'react-router-dom';
import { showUser } from '../utilities/users-service';
import { useAuth0 } from '@auth0/auth0-react';
import UserPanelItem from '../components/UserPanelItem';

export default function UserPanel({ setPannedEvent }) {
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
  const [activeTab, setActiveTab] = useState('cA');
  const navigate = useNavigate();

  async function retrieveUser() {
    try {
      setLoadingEvents(true);
      setLoadingUser(true);
      setActiveTab('cA');
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
    setActiveTab(e.target.id);
  }

  const active = 'tab tab-lg tab-lifted tab-active active:bg-base-200';
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
                      </div>
                    </div>
                    <div className='hidden md:stats shadow-md mx-1'>
                      <div className='stat place-items-center'>
                        <div className='stat-title'>Hosted Events</div>
                        <div className='stat-value'>{createdPast?.length}</div>
                      </div>
                    </div>
                    <div className='hidden lg:stats shadow-md mx-1'>
                      <div className='stat place-items-center'>
                        <div className='stat-title'>Attended Events</div>
                        <div className='stat-value'>
                          {attendingPast?.length}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className='tabs w-full flex flex-row justify-center my-10'>
                <a
                  id='cA'
                  className={activeTab === 'cA' ? active : inactive}
                  onClick={handleClick}
                >
                  HOSTING EVENTS
                </a>
                <a
                  id='aA'
                  className={activeTab === 'aA' ? active : inactive}
                  onClick={handleClick}
                >
                  ATTENDING EVENTS
                </a>
                <a
                  id='cP'
                  className={activeTab === 'cP' ? active : inactive}
                  onClick={handleClick}
                >
                  HOSTED EVENTS
                </a>
                <a
                  id='aP'
                  className={activeTab === 'aP' ? active : inactive}
                  onClick={handleClick}
                >
                  ATTENDED EVENTS
                </a>
              </div>

              {loadingEvents ? (
                <div className='flex flex-col justify-center align-middle items-center w-4/5 lg:w-3/5'>
                  Loading Events...
                </div>
              ) : (
                <div
                  className='flex flex-col justify-center align-middle items-center
                w-11/12 md:9/12 lg:w-6/12 lg:min-w-[925px]'
                >
                  <section className='w-full' hidden={!(activeTab === 'cA')}>
                    {created.length ? (
                      <>
                        {created.map((event) => (
                          <UserPanelItem
                            key={event._id}
                            event={event}
                            currUser={currUser}
                            routeId={routeId}
                            retrieveEvents={retrieveEvents}
                            past={false}
                            type='created'
                            setPannedEvent={setPannedEvent}
                          />
                        ))}
                      </>
                    ) : (
                      <div>Not hosting any event yet.</div>
                    )}
                  </section>

                  <section className='w-full' hidden={!(activeTab === 'cP')}>
                    {createdPast.length ? (
                      <>
                        {createdPast.map((event) => (
                          <UserPanelItem
                            key={event._id}
                            event={event}
                            currUser={currUser}
                            routeId={routeId}
                            retrieveEvents={retrieveEvents}
                            past={true}
                            type='created'
                            setPannedEvent={setPannedEvent}
                          />
                        ))}
                      </>
                    ) : (
                      <div>Not hosted any event yet.</div>
                    )}
                  </section>

                  <section className='w-full' hidden={!(activeTab === 'aA')}>
                    {attending.length ? (
                      <>
                        {attending.map((event) => (
                          <UserPanelItem
                            key={event._id}
                            event={event}
                            currUser={currUser}
                            routeId={routeId}
                            retrieveEvents={retrieveEvents}
                            past={false}
                            type='attending'
                            setPannedEvent={setPannedEvent}
                          />
                        ))}
                      </>
                    ) : (
                      <div>Not attending any event yet.</div>
                    )}
                  </section>

                  <section className='w-full' hidden={!(activeTab === 'aP')}>
                    {attendingPast.length ? (
                      <>
                        {attendingPast.map((event) => (
                          <UserPanelItem
                            key={event._id}
                            event={event}
                            currUser={currUser}
                            routeId={routeId}
                            retrieveEvents={retrieveEvents}
                            past={true}
                            type='attending'
                            setPannedEvent={setPannedEvent}
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
