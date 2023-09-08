import { update } from "../utilities/events-api"
import { updateEvent } from "../utilities/events-service"
import { deleteEvent } from "../utilities/events-service"
import { useState } from "react"

export default function UserPanelCreatedItem({ event, currUser, routeId , retrieveEvents}){
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editEvent, setEditEvent] = useState("")

    async function handleDelete(e){
        try{
            e.preventDefault()
            const res = await deleteEvent(event._id)
            if(res._id){
                retrieveEvents()
            }else {
                throw Error("Something went wrong with deleting an event.")
            }
        }catch(err){    
            console.log(err)
        }
    }

    function handleClick(){
        setIsModalOpen(true)
        const data={
            name: event.name,
            location: event.location,
            description: event.description,
            category: event.category
        }
        setEditEvent(data)
    }

    function handleCancel(){
        setIsModalOpen(false)
    }

    function handleChange(e){
        const data = {
            ...editEvent,
            [e.target.name]: e.target.value
        }
        setEditEvent(data)
    }

    async function handleSubmit(e){
        try{
            e.preventDefault()
            const res = updateEvent(event._id ,editEvent)
            setIsModalOpen(false)
            retrieveEvents()
        }catch(err){
            console.log(err)
        }
    }

    return (
        <>
            <div>
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
                            onClick={handleClick}
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
                
            <dialog className='modal' open={isModalOpen} >
                <div className='modal-box flex flex-col justify-center align-middle items-center'>
                    <form method="dialog" className="w-full max-w-xs">

                        <div className='form-control w-full max-w-xs'>
                            <label className='label' htmlFor='name'>
                                <span className='label-text'>Edit name:</span>
                            </label>
                            <input
                                type='text'
                                name='name'
                                value={editEvent.name}
                                onChange={handleChange}
                                className='input input-bordered w-full max-w-xs input-primary'
                            />
                        </div>

                        <div className='form-control w-full max-w-xs'>
                            <label className='label' htmlFor='location'>
                                <span className='label-text'>Location description</span>
                            </label>
                            <input
                                type='text'
                                name='location'
                                required
                                value={editEvent.location}
                                onChange={handleChange}
                                className='input input-bordered w-full max-w-xs input-primary'
                            />
                        </div>

                        <div className='form-control w-full max-w-xs'>
                            <label className='label'>
                                <span className='label-text'>Pick a category:</span>
                            </label>
                            <select
                                name='category'
                                onChange={handleChange}
                                value={editEvent.category}
                                className='select select-bordered select-primary'
                            >
                                <option value={'1'}>Art</option>
                                <option value={'2'}>Business</option>
                                <option value={'3'}>Exercise</option>
                                <option value={'4'}>Food</option>
                                <option value={'5'}>Games</option>
                                <option value={'6'}>Language</option>
                                <option value={'7'}>Music</option>
                                <option value={'8'}>Party</option>
                                <option value={'9'}>Politics</option>
                                <option value={'10'}>Science</option>
                                <option value={'11'}>Sport</option>
                                <option value={'12'}>Tech</option>
                            </select>
                        </div>

                        {/* <div className='form-control w-full max-w-xs'>
                            <label className='label' htmlFor='date'>
                                <span className='label-text'>Event start time:</span>
                            </label>
                            <input
                                className='primary label-text input input-bordered w-full max-w-xs input-primary'
                                type='datetime-local'
                                value={editEvent.date}
                                onChange={handleChange}
                                id='date'
                                required
                                name='date'
                                min={Date.now()}
                            />
                        </div> */}

                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text'>Event description:</span>
                            </label>
                            <textarea
                                name='description'
                                value={editEvent.description}
                                onChange={handleChange}
                                className='textarea textarea-bordered h-24 border-primary'
                                required
                            ></textarea>
                        </div>

                        <button className="btn btn-primary" onClick={handleSubmit}>CONFIRM EDIT</button> 
                    </form>
                    
                </div>
                <form method='dialog' className='modal-backdrop'>
                    <button onClick={handleCancel}>close</button>
                </form>
            </dialog>




        </>
    )
}