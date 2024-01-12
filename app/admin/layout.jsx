'use client';

import { useContext, useEffect } from 'react';
import { UserContext } from '@/context';
import { redirect } from 'next/navigation';

const AdminLayout = ({ children }) => {
  const { state } = useContext(UserContext);

  console.log(state.userInfo.role !== 'admin');
  useEffect(() => {
    if (state.userInfo.role !== 'admin') {
      redirect('/')
    }
  }, [state?.userInfo?.role]);

  return <>{children}</>;
};

export default AdminLayout;
