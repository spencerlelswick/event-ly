import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { MdLogin } from 'react-icons/md';

const HeaderLogin = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      onClick={() => loginWithRedirect()}
      className='text-white text-2xl sm:text-2xl w-1/3 flex items-center justify-end'
    >
      <MdLogin />
    </button>
  );
};

export default HeaderLogin;
