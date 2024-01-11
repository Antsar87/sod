'use client';

import { UserContext } from '@/context';
import { redirect } from 'next/navigation';
import { useContext, useEffect } from 'react';

const layout = ({ children }) => {
  const { state } = useContext(UserContext);

  useEffect(() => {
    if (state.userInfo.token) {
      redirect('/');
    }
  }, [state.userInfo.token]);

  return children;
};

export default layout;
