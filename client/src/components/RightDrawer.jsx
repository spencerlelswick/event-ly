
import NewEventModal from "./NewEventModal"
import EventsList from "./EventsList"

export default function RightDrawer({coordinates,eventsList,setEventsList}){
    return(
        <div
        style={{ height: '95vh' }}
        className='z-10 invisible sm:visible absolute bg-yellow-600 right-0 w-2/5 overflow-auto'
        >
            <div className='flex justify-between m-2'>
                <h2 className='text-4xl'>Event List:</h2>
                <NewEventModal/>
            </div>
            <EventsList coordinates={coordinates} eventsList={eventsList} setEventsList={setEventsList}/>
      </div>
  );
}
