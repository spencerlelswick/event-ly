import { updateEvent } from "../utilities/events-service"
import { Link } from "react-router-dom"
import { decodeCat } from "../utilities/category"

export default function UserPanedlAttendingItem({ event, currUser, routeId, retrieveEvents, past }) {

    async function handleRemove(e) {
        try {
            e.preventDefault()
            const data = [...event.guests]
            const idx = data.indexOf(currUser.ID)
            data.splice(idx, 1)
            const updatedEvent = await updateEvent(event._id, { guests: data })
            if (updatedEvent._id) {
                retrieveEvents()
            } else {
                throw Error("Something went wrong with removing a guest.")
            }
        } catch (err) {
            console.log(err)
        }   
    }

    return (
          <div className="card md:card-side bg-base-100 shadow-xl">
          <figure >
              <img src={event.image} alt={event.name}  />
          </figure>
          <div className="card-body">
              <h2 className="card-title">{event.name}</h2>
              <p>Address: {event.address}</p>
              <p>Location: {event.location}</p>
              <p>Category: {decodeCat(event.category)}</p>
              <p>Date: {new Date(event.date).toLocaleString()}</p>
              <p>Description: {event.description}</p>
              <p>Partecipants: {event.guests.length}</p>
              <p>
                Host:
                <Link to={`/user/${event.createdBy}`}> CLICK ME</Link>
            </p>
              <div className="card-actions ">
                  {currUser.ID === routeId ? (
                      <div hidden={past}>
                        <div hidden={past}>
                            <button className='btn btn-secondary'
                                onClick={handleRemove}
                            >Remove me
                            </button>
                        </div>
                      </div>
                  ) : (
                      null
                  )}
              </div>
          </div>
      </div>
    )
}