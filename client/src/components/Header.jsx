import React, { useContext } from 'react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { UserContext } from '../components/App';
import { FiUser } from 'react-icons/fi';
import HeaderLogin from './HeaderLogin';

const Header = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const currUser = useContext(UserContext);

  return (
    <header className='bg-primary h-[5vh] text-white'>
      <div
        id='mobile-menu'
        className='sm:hidden h-full flex justify-between mx-5'
      >
        <div className='flex items-center justify-start w-1/3'>
          <Link to='/'>
            {/* <img src='/assets/evently-logo.png' className='h-20' /> */}
            <div id='logo' className='h-full'>
              <h1 className='text-2xl max-h-full'>event.ly</h1>
            </div>
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
                    <FiUser className='inline text-3xl md:text-2xl' />
                  </Link>
                </div>
                <LogoutButton />
              </>
            ) : (
              <HeaderLogin />
            )}
          </>
        ) : null}
      </div>

      <div
        id='desktop-menu'
        className='hidden sm:flex h-full justify-between mx-5'
      >
        <Link to='/' className='w-1/3 flex justify-start items-center'>
          {/* <img src='/assets/evently-logo.png' className='h-16' /> */}
          <div id='logo' className='h-full'>
            <h1 className='text-2xl max-h-full'>event.ly</h1>
          </div>
        </Link>
        {!isLoading ? (
          <>
            {isAuthenticated && currUser ? (
              <>
                <Link
                  to={`/user/${currUser.ID}`}
                  className='w-1/3 flex justify-center items-center '
                >
                  <FiUser className='inline text-3xl md:text-3xl' />
                  <span className='sm:text-2xl ml-2'>My Events</span>
                </Link>
                <LogoutButton />
              </>
            ) : (
              <HeaderLogin />
            )}
          </>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
