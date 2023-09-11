export default function EventsListSort({ setSorted }) {
  return (
    <form>
      <div className='flex m-2 justify-between align-middle items-center'>
        <h2 className=' text-xl font-medium m-2'>Events In Your Area:</h2>
        <select
          defaultValue={'date'}
          className='select select-ghost text-primary w-1/3'
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
