import React from 'react';

const AddressSearch = () => {
  return (
    <>
      <label className='label'>
        <span className='label-text'>What is the location of your event?</span>
      </label>
      <input
        type='text'
        placeholder='Type here'
        className='input input-bordered w-full max-w-xs input-primary'
      />
    </>
  );
};

export default AddressSearch;
