'use client';

import { UserContext } from '@/context';
import { redirect } from 'next/navigation';
import { useContext, useEffect } from 'react';

const layout = ({ children }) => {
  const { state } = useContext(UserContext);

  if (!state.userInfo.token) {
    redirect('/login');
  }

  return children;
};

export default layout;
