import React, { useContext } from 'react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { UserContext } from '../components/App';
import { FaHouseChimneyUser } from 'react-icons/fa6';

const Header = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const currUser = useContext(UserContext);

  return (
    <header className='bg-primary h-[10vh] sm:h-[5vh] text-white'>
      <div
        id='mobile-menu'
        className='sm:hidden h-full flex justify-between mx-5'
      >
        <div className='flex items-center justify-start w-1/3'>
          <Link to='/'>
            <img src='/assets/evently-logo.png' className='h-20' />
          </Link>
        </div>

        {!isLoading ? (
          <>
            {isAuthenticated && currUser ? (
              <>
                <div className='flex flex-row items-center w-1/3'>
                  <Link
                    to={`/user/${currUser.ID}`}
                    className='w-full flex justify-center align-middle items-center'
                  >
                    <FaHouseChimneyUser className='inline text-5xl md:text-2xl' />
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
