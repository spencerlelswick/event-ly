export default function EventsListSort({setSorted}) {
    return(
        <div className='flex justify-between m-2'>
        <form >
          <h2>Sort by</h2>
          <select
          defaultValue={"date"}
          className='select select-bordered select-primary'
          onChange={(e)=>setSorted(e.target.value)}
          >
            <option value={"date"}>Upcoming</option>
            <option value={"dist"}>Proximity</option>
            <option value={"guests"}>Number of Guests</option>
            <option value={"name"}>Name</option>
            <option value={"nameInv"}>Name - inverse</option>
          </select>
        </form>
      </div>
    )
}