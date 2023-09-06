import React from 'react';
import LoginButton from './Auth/LoginButton';
import LogoutButton from './Auth/LogoutButton';
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {

  const { user, isAuthenticated, isLoading } = useAuth0()
  console.log(user)
  return (
    <header style={{ height: '5vh' }} className='bg-primary text-white'>
      <div id='mobile-menu' className='sm:hidden flex justify-between'>
        <p>search</p>
        <h1>Logo</h1>
        {!isLoading ? (
          isAuthenticated ? (
            <LogoutButton/>
          ) : (
            <LoginButton/>
          )
        ) : (null)}
      </div>
      <div id='desktop-menu' className='hidden sm:flex justify-between'>
        <h1>Logo</h1>
        <ul className='flex'>
          <li className='mx-2'>link 1</li>
          <li className='mx-2'>link 2</li>
          <li className='mx-2'>link 3</li>
        </ul>

        {!isLoading ? (
          isAuthenticated ? (
            <LogoutButton/>
          ) : (
            <LoginButton/>
          )
        ) : (null)}

      </div>
    </header>
  );
};

export default Header;
