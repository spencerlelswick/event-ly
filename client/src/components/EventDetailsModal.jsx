import { showEvent } from "../utilities/events-service";
import { useState } from "react"
import EventDetailsComments from "./EventDetailsComments";
import EventDetailsGuests from "./EventDetailsGuests";

export default function EventDetailsModal({modalId,eventId}) {

    const [loadingShow, setLoadingShow] = useState(true)
    const [event, setEvent] = useState(null)

    async function handleClick() {
        document.getElementById(modalId).showModal()
        retrieveData()
    }

    async function retrieveData(){
        try{
            const showResponse = await showEvent(eventId)

            if (showResponse?._id) {
                setEvent(showResponse)
                setLoadingShow(false)
            } else {
                console.log(showResponse)
            }
        }catch(err){
            console.log(err)
        }
    }

    return (
        <>
            <button
                onClick={() => handleClick()}
                className='btn btn-active btn-primary'
                >
                Event Details
            </button>
            
            <dialog id={modalId} className='modal'>
                <div className="modal-box flex flex-col justify-center align-middle items-center w-full max-w-5xl">
                    {loadingShow ? (
                    <div>Loading Events Details</div>
                    ) : (
                    <div className="w-full">
                        <div>{event.name}</div>
                        <img src={event.image} alt={event.name}/>
                        <div>{event.description}</div>
                        <div>{event.location}</div>
                        <div>{event.address}</div>
                        <div>{event.date}</div>

                        <hr/>
                        <div>
                            Host
                            <div className="flex flex-row align-middle items-center">
                                <img src={event.createdBy.avatar} alt={event.createdBy.name} className="rounded-full w-12"/>
                                {event.createdBy.name}
                            </div>
                        </div>

                        <hr/>
                        <EventDetailsGuests event={event} setEvent={setEvent}/>

                        <hr/>
                        <EventDetailsComments event={event} setEvent={setEvent}/>

                    </div>
                    )}
                    <div className="modal-action">
                        <form method="dialog" >
                            <button className="btn btn-secondary w-full ">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
}

