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
            <option value={"guests"}>Number of guests</option>
            <option value={"name"}>Name - ascending</option>
            <option value={"nameInv"}>Name - descending</option>
          </select>
        </form>
      </div>
    )
}