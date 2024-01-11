'use client';

import { UserContext } from '@/context';
import { useContext } from 'react';

const MyAccount = () => {
  const { dispatch, state } = useContext(UserContext);

  return (
    <div className='container'>
      MyAccount
      <ul>
        <li>{state.userInfo.name}</li>
        <li><p>{state.userInfo.token}</p></li>
        <li>{state.userInfo.role}</li>
      </ul>
      <button className="btn" onClick={() => dispatch({ type: 'LOG_OUT' })}>
        Log out
      </button>
    </div>
  );
};

export default MyAccount;
