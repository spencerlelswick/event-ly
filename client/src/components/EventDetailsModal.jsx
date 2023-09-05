import { showEvent } from "../utilities/events-service";
import { useState } from "react"
import EventDetailsComments from "./EventDetailsComments";

export default function EventDetailsModal({modalId,eventId}) {

    const [loadingShow, setLoadingShow] = useState(true)
    const [eventDetails, setEventDetails] = useState(null)
    const [comments, setComments] = useState(null)

    async function handleClick() {
        
        document.getElementById(modalId).showModal()

        const detailResponse = await showEvent(eventId)

        if (detailResponse?._id) {
            setEventDetails(detailResponse)
            setLoadingShow(false)
            setComments(detailResponse.comments)
        } else {
            console.log(detailResponse)
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
                ): (
                <div className="w-full">
                    <div>{eventDetails.name}</div>
                    <img src={eventDetails.image} alt={eventDetails.name}/>
                    <div>{eventDetails.location}</div>
                    <div>{eventDetails.address}</div>
                    <div>{eventDetails.date}</div>

                    <hr/>
                    <div>Host: {eventDetails.createdBy.name}</div>

                    <hr/>
                    <div>Guests:</div>

                    <hr/>
                    <EventDetailsComments comments={comments} setComments={setComments}/>


                    <button className="btn btn-primary w-full max-w-xs">Partecipate</button>
                </div>
                )}
                    <form>
                        <button>Close</button>
                    </form>
            

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

