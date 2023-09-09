import React, { useContext } from 'react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { UserContext } from '../components/App';

const Header = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const currUser = useContext(UserContext);

  return (
    <header style={{ height: '5vh' }} className='bg-primary text-white'>
      <div id='mobile-menu' className='sm:hidden h- flex justify-between'>
        <Link to='/'>
          <img src='/assets/evently-logo.png' className='h-10' />
        </Link>

        {!isLoading ? (
          <>
            {isAuthenticated && currUser ? (
              <>
                <div>
                  <Link to={`/user/${currUser.ID}`}>
                    <h1>User Panel</h1>
                  </Link>
                </div>
                <LogoutButton />
              </>
            ) : (
              <LoginButton />
            )}
          </>
        ) : null}
      </div>

      <div id='desktop-menu' className='hidden sm:flex justify-between'>
        <Link to='/'>
          <img src='/assets/evently-logo.png' className='h-10' />
        </Link>
        {!isLoading ? (
          <>
            {isAuthenticated && currUser ? (
              <>
                <Link to={`/user/${currUser.ID}`}>
                  <h1>My Events</h1>
                </Link>
                <LogoutButton />
              </>
            ) : (
              <LoginButton />
            )}
          </>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
