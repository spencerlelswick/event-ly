import { updateEvent } from "../utilities/events-service"
import { deleteEvent } from "../utilities/events-service"
import { Link } from "react-router-dom"
import { useState } from "react"

export default function UserPanelCreatedItem({ event, currUser, routeId , retrieveEvents}){
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editEvent, setEditEvent] = useState(event)

    async function handleDelete(e){
        try{
            e.preventDefault()
            const res = await deleteEvent(event._id)
            console.log(res)
            if(res._id){
                retrieveEvents()
            }else {
                throw Error("Something went wrong with deleting an event.")
            }
        }catch(err){    
            console.log(err)
        }
    }

    async function handleUpdate(e){

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
                <div>
                    <button className='btn btn-primary'
                        onClick={handleUpdate}
                    >Update Event
                    </button>
                    <button className='btn btn-secondary'
                        onClick={handleDelete}
                    >Delete Event
                    </button>
                </div>
            ) : (
                null
            )}
        </div>
    )
}