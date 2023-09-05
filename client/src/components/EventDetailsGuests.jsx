import { updateEvent } from "../utilities/events-service"

export default function EventDetailsGuests({event, retrieveData}) {

    async function handlePartecipate(e){
        e.preventDefault()
        const userId = "64f397b1dc1e188f1c659f95" //placeholder
        const data = {guests: [...event.guests, userId]}
        console.log(data)
        await updateEvent(event._id, data)
        retrieveData()
    }

    return(
        <div>
            Guests
            {event.guests.length  ? (
                <>
                {event.guests.map((g)=>(
                    <div key={g._id}>
                        {g.name}
                    </div>
                ))}
               </>
            ) : (
                <div>No Guests yet</div>
            )}

            <button onClick={handlePartecipate} className="btn btn-primary w-full max-w-xs">Partecipate</button>
        </div>
    )
}