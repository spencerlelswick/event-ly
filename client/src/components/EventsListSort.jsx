export default function EventsListSort({ setSorted }) {
  return (
    <form>
      <div>
        <h2 className=' text-xl font-medium mx-6 mt-3'>Events In Your Area:</h2>
        <select
          defaultValue={'date'}
          className='select select-sm select-ghost text-primary mx-3'
          onChange={(e) => setSorted(e.target.value)}
        >
          <option value={'date'}>Upcoming</option>
          <option value={'dist'}>Proximity</option>
          <option value={'guests'}>Number of guests</option>
          <option value={'name'}>Name - ascending</option>
          <option value={'nameInv'}>Name - descending</option>
        </select>
      </div>
    </form>
  );
}
