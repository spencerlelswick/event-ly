import { updateEvent } from "../utilities/events-service"

export default function EventDetailsGuests({event, setEvent}) {

    console.log( "consol loggin from event", event.name)

    //const userId = "64f397b1dc1e188f1c659f95" //Spencer Placeholder
    const userId = "64f7b1b50b6175389101f547" //Federico Placeholder

    async function handlePartecipate(e){
        try{
            e.preventDefault()
            const data = [...event.guests, userId]
            const updatedEvent = await updateEvent(event._id, {guests: data})
            if (updatedEvent._id){
                setEvent(updatedEvent)
            }else {
                throw Error("Something went wrong with adding a guest.")
            }
        }catch(err){    
            console.log(err)
        }
    }

    async function handleRemove(e){
        try{
            e.preventDefault()
            const data = [...event.guests]
            const idx = data.indexOf(data.find((g)=>(g._id === userId)))
            data.splice(idx,1)
            const updatedEvent = await updateEvent(event._id, {guests: data})
            if (updatedEvent._id){
                setEvent(updatedEvent)
            }else {
                throw Error("Something went wrong with removing a guest.")
            }
        }catch(err){    
            console.log(err)
        }
    }

    return(
        <div>
            Guests
            {event.guests.length  ? (
                <div>
                {event.guests.map((g)=>(
                    <div key={g._id} className="flex flex-row align-middle items-center">
                        <img src={g.avatar} alt={g.name} className="rounded-full w-12"/>
                        {g.name}
                    </div>
                ))}
               </div>
            ) : (
                <div>No one yet. Be the first!</div>
            )}

            {event.guests.find((g)=>(g._id === userId)) === undefined ? (
                <button onClick={handlePartecipate} className="btn btn-primary w-full max-w-xs"
                disabled={userId===event.createdBy._id}
                 >
                    Partecipate
                </button>
            ) : (
                <button onClick={handleRemove} className="btn btn-primary w-full max-w-xs">
                    Remove me
                </button>
            )}
        </div>
    )
}