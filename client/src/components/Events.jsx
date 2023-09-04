import { useState, useEffect } from "react"
import { getAllEvents } from "../utilities/events-service"

export default function Events() {

    const [eventList, setEventList] = useState(null)
    const [loading, setLoading] = useState(true)

    async function fetchEvents() {
        const eventsResponse = await getAllEvents()
        if(eventsResponse.length){
            setEventList(eventsResponse)
            setLoading(false)
        }else{
            console.log(eventsResponse)
        }
    }

    useEffect(()=>{
        fetchEvents()
    },[])

    return( loading ?(
        <div>loading Events</div>
        ) : (
        <div>
            {eventList.map((e)=>(
                <div key={e._id}>
                    <hr/>
                    <div>{e.name}</div>
                    <div>{e.location}</div>
                    <div>{e.address}</div>
                    <hr/>
                </div>
            ))}
        </div>
        )
    )
}