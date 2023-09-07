import React, { useContext } from 'react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { useAuth0 } from "@auth0/auth0-react";
import {Link} from 'react-router-dom'
import { UserContext } from '../components/App';


const Header = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()
  const currUser = useContext(UserContext)

  return (
    <header style={{ height: '5vh' }} className='bg-primary text-white'>
      <div id='mobile-menu' className='sm:hidden flex justify-between'>
        <p>search</p>
        <h1>Logo</h1>
        
        {!isLoading ? (
          <>
          {isAuthenticated && currUser ? (
            <>
              <Link to={`/user/${currUser.ID}`}>
                <h1>User Panel</h1>
              </Link>
              <LogoutButton/>
            </>
          ) : (
            <LoginButton/>
          )}
          </>
        ) : (null)}
        
      </div>

      <div id='desktop-menu' className='hidden sm:flex justify-between'>
        <Link to="/">
          <h1>Logo</h1>
        </Link>
        <ul className='flex'>
          <li className='mx-2'>link 1</li>
          <li className='mx-2'>link 2</li>
          <li className='mx-2'>link 3</li>
        </ul>
        {!isLoading ? (
          <>
          {isAuthenticated && currUser ?  (
            <>
              <Link to={`/user/${currUser.ID}`}>
                <h1>User Panel</h1>
              </Link>
              <LogoutButton/>
            </>
          ) : (
            <LoginButton/>
          )}
          </>
        ) : null}

      </div>
    </header>
  );
};

export default Header;
