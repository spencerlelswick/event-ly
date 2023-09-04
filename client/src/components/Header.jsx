import React from 'react';

const Header = () => {
  return (
    <header style={{ height: '5vh' }} className='bg-red-500'>
      <div id='mobile-menu' className='sm:hidden flex justify-between'>
        <p>search</p>
        <h1>Logo</h1>
        <p>menu</p>
      </div>
      <div id='desktop-menu' className='hidden sm:flex justify-between'>
        <h1>Logo</h1>
        <ul className='flex'>
          <li className='mx-2'>link 1</li>
          <li className='mx-2'>link 2</li>
          <li className='mx-2'>link 3</li>
        </ul>
        <p>menu</p>
      </div>
    </header>
  );
};

export default Header;
