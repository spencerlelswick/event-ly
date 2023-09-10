import { updateEvent } from "../utilities/events-service"
import { deleteEvent } from "../utilities/events-service"
import { useState } from "react"
import { decodeCat } from "../utilities/category"

export default function UserPanelCreatedItem({ event, currUser, routeId, retrieveEvents }) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editEvent, setEditEvent] = useState("")

    async function handleDelete(e) {
        try {
            e.preventDefault()
            const res = await deleteEvent(event._id)
            if (res._id) {
                retrieveEvents()
            } else {
                throw Error("Something went wrong with deleting an event.")
            }
        } catch (err) {
            console.log(err)
        }
    }

    function handleClick() {
        setIsModalOpen(true)
        const data = {
            name: event.name,
            location: event.location,
            description: event.description,
            category: event.category,
            date: undefined
        }
        setEditEvent(data)
    }

    function handleCancel() {
        setIsModalOpen(false)
    }

    function handleChange(e) {
        const data = {
            ...editEvent,
            [e.target.name]: e.target.value
        }
        setEditEvent(data)
    }

    async function handleSubmit(e) {
        try {
            e.preventDefault()
            const data = { ...editEvent }
            if (data.date === undefined) {
                delete data.date
            }
            const res = await updateEvent(event._id, data)
            if (res._id) {
                setIsModalOpen(false)
                retrieveEvents()
            } else {
                throw Error("Something went wrong retrieving the events.")
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <div>
                <img src={event.image} alt={event.name} className=' w-20' />
                <div>Name: {event.name}</div>
                <div>Address: {event.address}</div>
                <div>Location: {event.location}</div>
                <div>Category: {decodeCat(event.category)}</div>
                <div>Date: {new Date(event.date).toLocaleString()}</div>
                <div>Description: {event.description}</div>
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
                    <img src={event.image} alt={event.name} />
                    <form method="dialog" className="w-full max-w-xs" onSubmit={handleSubmit}>

                        <div className='form-control w-full max-w-xs'>
                            <label className='label label-text' >
                                Edit name:
                            </label>
                            <input
                                type='text'
                                name='name'
                                required
                                defaultValue={event.value}
                                value={editEvent.name}
                                onChange={handleChange}
                                className='input input-bordered w-full max-w-xs input-primary'
                            />
                        </div>

                        <div className='form-control w-full max-w-xs'>
                            <label className='label label-text' >
                                Edit location description
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
                            <label className='label label-text'>
                                Edit category:
                            </label>
                            <select
                                name='category'
                                required
                                onChange={handleChange}
                                value={editEvent.category}
                                className='select select-bordered select-primary'
                            >
                                {(() => {
                                    const arr = []
                                    for (let i = 1; i <= 12; i++) {
                                        arr.push(<option key={i} value={i}>{decodeCat(i)}</option>)
                                    }
                                    return arr
                                })()}
                                
                            </select>
                        </div>
                        <label className='label label-text' >
                            Set start time:
                        </label>
                        <p className='text-xl'>
                            {new Date(event.date).toLocaleString()}
                        </p>

                        <div className='form-control w-full max-w-xs'>
                            <label className='label label-text' >
                                Edit start time:
                            </label>
                            <input
                                className='primary label-text input input-bordered w-full max-w-xs input-primary'
                                type='datetime-local'
                                value={editEvent.date}
                                onChange={handleChange}
                                id='date'
                                name='date'
                                min={new Date().toISOString().slice(0, -8)}
                            />
                        </div>

                        <div className='form-control'>
                            <label className='label label-text'>
                                Edit description:
                            </label>
                            <textarea
                                name='description'
                                value={editEvent.description}
                                onChange={handleChange}
                                className='textarea textarea-bordered h-24 border-primary'
                                required
                            ></textarea>
                        </div>

                        <button className="btn btn-primary" type="submit" >CONFIRM EDIT</button>

                    </form>
                    <form method='dialog'>
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleCancel}>✕</button>
                    </form>
                </div>
                <form method='dialog' className='modal-backdrop'>
                    <button onClick={handleCancel}>close</button>
                </form>
            </dialog>
        </>
    )
}