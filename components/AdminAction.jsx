'use client';

import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '@/context';

import LoadingComponent from '@/components/LoadingComponent';
import { getError } from '@/utilities/getError';
import axios from 'axios';
import { toast } from 'react-toastify';
import { revalidate } from './revalidate';
import Link from 'next/link';

const AdminAction = () => {
  const [show, setShow] = useState(false);
  const { state } = useContext(UserContext);

  useEffect(() => {
    if (state.userInfo.role === 'admin') {
      setShow(true);
      return;
    }

    setShow(false);
  }, [state.userInfo.role]);

  if (!show) {
    return null;
  }

  return (
    <li>
      <div className="dropdown dropdown-hover">
        <div tabIndex={0} role="button" className="uppercase text-xl">
          Admin
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow rounded-box w-52 bg-blue-300"
        >
          <li>
            <Link href={'/admin/sodmanagement'}>Management sod</Link>
          </li>
          <li>
            <Link href={'/admin/suppliermanagement'}>Management supplier</Link>
          </li>
        </ul>
      </div>
    </li>
  );
};

export default AdminAction;
