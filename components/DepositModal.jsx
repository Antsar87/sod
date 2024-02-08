'use client';

import { IoCloseOutline } from 'react-icons/io5';
import LoadingComponent from '@/components/LoadingComponent';
import { UserContext } from '@/context';
import { useContext, useEffect, useRef, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { stripeAction } from './revalidate';
import { toast } from 'react-toastify';
import { getError } from '@/utilities/getError';
import { redirect } from 'next/navigation';

const DepositModal = () => {
  const { state } = useContext(UserContext);
  const [showBtn, setShowBtn] = useState(false);
  const form = useRef();

  const handleSubmit = async (formData) => {
    // const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
    // price_1OgnuZFBdPjyyB4ctRTx2BDl
    try {
      // const { data } = await axios.post('/sods', formData);
      const data = await stripeAction();
      window.location.href = data.url;
      // toast.success('Sod created');
      form.current.reset();
      // document.getElementById('verifyModal').close();
    } catch (error) {
      toast.error(getError(error));
    }
  };

  useEffect(() => {
    setShowBtn(!!state.userInfo.token);
  }, [state.userInfo]);
 
  return (
    <>
      {showBtn && (
        <button
          className="btn bg-green-500"
          onClick={() => document.getElementById('depositModal').showModal()}
        >
          Deposit
        </button>
      )}

      <dialog id="depositModal" className="modal">
        <div className="modal-box">
          <button
            className="text-xl fixed right-2 top-2"
            onClick={() => document.getElementById('depositModal').close()}
          >
            <IoCloseOutline />
          </button>
          <h2 className="text-center text-2xl">
            If you wish to continue you must take a deposit of $100 for your
            team to verify your property
          </h2>

          <div className="w-full mt-5">
            <form
              ref={form}
              className="rounded-lg bg-white"
              action={handleSubmit}
            >
              <div className="bg-red-500 text-white px-4 text-center py-5 mb-5">
                Note: The price can increase.
              </div>

              <label className="flex items-center gap-5">
                <input
                  name="cell"
                  type="checkbox"
                  className="h-5 w-5 mb-5"
                  required
                />
                Authorization to access the residence in case it is unoccupied.
              </label>

              <label className="inline-block mt-5">
                <span className="block">Revision Date</span>
                <input
                  name="Address"
                  placeholder="Address"
                  type="date"
                  className="mb-5"
                  required
                />
              </label>

              <div className="bg-gray-400 mb-5 text-center py-5 uppercase">
                Stripe Form
              </div>

              <LoadingComponent className="btn w-full" text="Deposit" />
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default DepositModal;
