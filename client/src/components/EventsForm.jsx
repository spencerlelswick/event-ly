import React from 'react';


const initState = {
  name: '',
  image: 'https://picsum.photos/200/320',
  title: '',
};

const EventsForm = () => {

  const [newForm, setNewForm] = useState(initState);

  return (
    <div>
      <form>
        <input
          type='text'
          placeholder='Type here'
          className='input input-bordered input-primary w-full max-w-xs'
        />
      </form>
    </div>
  );
};

export default EventsForm;
