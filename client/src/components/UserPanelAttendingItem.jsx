import { updateEvent } from "../utilities/events-service"
import { Link } from "react-router-dom"
import { decodeCat } from "../utilities/category"

export default function UserPanedlAttendingItem({ event, currUser, routeId, retrieveEvents }) {

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
        <div>
            <img src={event.image} alt={event.name} className=' w-20' />
            <div>Name: {event.name}</div>
            <div>Address: {event.address}</div>
            <div>Location: {event.location}</div>
            <div>Category: {decodeCat(event.category)}</div>
            <div>Date: {new Date(event.date).toLocaleString()}</div>
            <div>Description: {event.description}</div>
            <div>
                Host:
                <Link to={`/user/${event.createdBy}`}> CLICK ME</Link>
            </div>
            <div>Partecipants: {event.guests.length}</div>
            {currUser.ID === routeId ? (
                <button className='btn btn-secondary'
                    onClick={handleRemove}
                >Remove me
                </button>
            ) : (
                null
            )}
        </div>
    )
}