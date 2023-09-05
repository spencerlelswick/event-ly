import { showEvent } from "../utilities/events-service";
import { useState, useEffect } from "react"

export default function EventDetailsModal({eventId}) {

    const [loadingShow, setLoadingShow] = useState(true)
    const [eventDetails, setEventDetails] = useState(null)

    async function handleClick() {
        
        document.getElementById(eventId).showModal()

        const detailResponse = await showEvent(eventId)

        if (detailResponse?._id) {
            setEventDetails(detailResponse)
            setLoadingShow(false)
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
        <dialog id={eventId} className='modal'>
            <form
                method='dialog'
                className='modal-box flex flex-col justify-center align-middle items-center'
                >
                    {loadingShow ? (
                        <div>Loading Events Details</div>
                    ): (
                    <div>
                        <div>{eventDetails.name}</div>
                        <img src={eventDetails.image} alt={eventDetails.name}/>
                        <div>Hosted by {eventDetails.createdBy.name}</div>
                        <div>{eventDetails.location}</div>
                        <div>{eventDetails.address}</div>
                        <div>Comments
                            { eventDetails.comments.length  ? (
                                <div>{eventDetails.comments[0].username}:{eventDetails.comments[0].body}</div>
                            ) : (
                                <div>No Comments yet</div>
                            )}
                        </div>


                        <button className='btn btn-primary mt-5'>Partecipate</button>

                    </div>
                    )}
                        <button className='btn btn-outline btn-secondary mt-1'>
                            Cancel
                        </button>
            </form>

            <form method='dialog' className='modal-backdrop'>
                <button>close</button>
            </form>
        </dialog>
        </>
    );
}

