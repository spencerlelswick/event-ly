import { useAuth0 } from '@auth0/auth0-react';
import { MdLogout } from 'react-icons/md';

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
      className='text-white text-5xl w-1/3 flex items-center justify-end'
    >
      <MdLogout />
    </button>
  );
};

export default LogoutButton;
