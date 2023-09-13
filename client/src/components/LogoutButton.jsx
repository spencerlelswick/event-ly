import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { MdLogout } from 'react-icons/md';

const LogoutButton = ({ currUser }) => {
  const { logout } = useAuth0();

  return (
    <div className='flex justify-center items-center'>
      {currUser?.PIC ? (
        <>
          <span className='mr-2 text-sm'>{currUser.NAME.split(' ')[0]}</span>
          <img src={currUser.PIC} alt='avatar' className='btn-circle p-1' />
        </>
      ) : null}

      <button
        id='mobile-logout'
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
        className='text-white text-3xl md:text-2xl flex items-center justify-end'
      >
        <MdLogout />
      </button>
    </div>
  );
};

export default LogoutButton;
