import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { MdLogout } from 'react-icons/md';

const LogoutButton = ({ currUser }) => {
  const { logout } = useAuth0();

  return (
    <button
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
      className='text-white text-3xl sm:text-2xl w-1/3 flex items-center justify-end'
    >
      {currUser?.PIC ? (
        <div className='flex justify-center items-center'>
          <span className='mr-2 text-sm'>{currUser.NAME.split(' ')[0]}</span>
          <img src={currUser.PIC} alt='avatar' className='btn-circle p-1' />
        </div>
      ) : (
        <MdLogout />
      )}
    </button>
  );
};

export default LogoutButton;
