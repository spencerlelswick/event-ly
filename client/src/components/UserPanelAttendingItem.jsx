import { updateEvent } from "../utilities/events-service"
import { Link } from "react-router-dom"

export default function UserPanedlAttendingItem({ event, currUser, routeId , attendingEvents, setAttendingEvents}){

    async function handleRemove(e){
        try{
            e.preventDefault()
            const data = [...event.guests]
            console.log(data)
            const idx = data.indexOf(currUser.ID)
            console.log(idx)
            data.splice(idx,1)
            console.log(data)
            const updatedEvent = await updateEvent(event._id, {guests: data})
            console.log(updatedEvent)
            if (updatedEvent._id){
                console.log(attendingEvents)
                const list = [...attendingEvents]
                console.log(list)
                const idx = data.indexOf(list.find((e)=>(e._id === updatedEvent._id)))
                list.splice(idx,1)
                setAttendingEvents(list)
            }else {
                throw Error("Something went wrong with removing a guest.")
            }
        }catch(err){    
            console.log(err)
        }
    }

    return (
        <div key={event._id}>
            <div>{event.name}</div>
            <img src={event.image} alt={event.name} className=' w-20' />
            <div>Description: {event.description}</div>
            <div>Address: {event.address}</div>
            <div>Location: {event.location}</div>
            <div>Date: {event.date}</div>
            <div>Category: {event.category}</div>
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