import { updateEvent } from "../utilities/events-service"
import { deleteEvent } from "../utilities/events-service"
import { Link } from "react-router-dom"

export default function UserPanelCreatedItem({ event, currUser, routeId , createdEvents, setCreatedEvents}){

    async function handleDelete(e){
        try{
            e.preventDefault()
            const res = await deleteEvent(event._id)
            console.log(res)
            if(res._id){
                const list = [...createdEvents]
                const idx = list.indexOf(list.find((e)=>(e._id === res._id)))
                list.splice(idx,1)
                setCreatedEvents(list)
            }else {
                throw Error("Something went wrong with deleting an event.")
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
            <div>Partecipants: {event.guests.length}</div>
            {currUser.ID === routeId ? (
                <button className='btn btn-secondary'
                    onClick={handleDelete}
                >Delete Event
                </button>
            ) : (
                null
            )}
        </div>
    )
}