'use client';

import LoadingComponent from '@/components/LoadingComponent';
import { UserContext } from '@/context';
import { getError } from '@/utilities/getError';
import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';

const VerifyModal = () => {
  const [showBtn, setShowBtn] = useState(false);
  const { state, dispatch } = useContext(UserContext);
  const form = useRef();

  const handleSubmit = async (formData) => {
    try {
      const { data } = await axios.post('/users/register', {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
      });
      dispatch({ type: 'LOG_IN', payload: data });
      toast.success('Registered');

      form.current.reset();
      document.getElementById('verifyModal').close();
      document.getElementById('depositModal').showModal();
    } catch (error) {
      toast.error(getError(error));
    }
  };

  useEffect(() => {
    setShowBtn(!state.userInfo?.token);
  }, [state.userInfo]);

  return (
    <>
      {showBtn && (
        <button
          className="btn bg-green-500"
          onClick={() => document.getElementById('verifyModal').showModal()}
        >
          Get verified
        </button>
      )}

      <dialog id="verifyModal" className="modal">
        <div className="modal-box">
          <button
            className="text-xl fixed right-2 top-2"
            onClick={() => document.getElementById('verifyModal').close()}
          >
            <IoCloseOutline />
          </button>
          <h2 className="text-center text-2xl">Get Verified</h2>

          <div className="w-full mt-5">
            <form
              ref={form}
              className="rounded-lg bg-white"
              action={handleSubmit}
            >
              <input
                name="name"
                placeholder="name"
                type="name"
                className="input mb-5"
                required
              />

              <input
                name="email"
                placeholder="email"
                type="email"
                className="input mb-5"
                required
              />

              <input
                name="password"
                placeholder="Password"
                type="text"
                className="input mb-5"
                required
              />

              <input
                name="cell"
                placeholder="cell #"
                type="text"
                className="input mb-5"
                required
              />

              <input
                name="Address"
                placeholder="Address"
                type="text"
                className="input mb-5"
                required
              />

              <LoadingComponent className="btn w-full" text="Register" />
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default VerifyModal;
