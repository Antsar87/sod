'use client';

import { useState } from 'react';
import DepositModal from './DepositModal';
import VerifyModal from './VerifyModal';
import axios from 'axios';
import LoadingComponent from './LoadingComponent';

const CalculateForm = ({ id }) => {
  const [price, setPrice] = useState(0);

  const handlePrice = async (formData) => {
    const sq_ft = +formData.get('sq_ft');

    console.log(sq_ft);

    if (!sq_ft) {
      setPrice(0);
      console.log('entro aqui');
      return;
    }

    console.log(`/suppliers/calculate/${id}/${sq_ft}`);

    try {
      const { data } = await axios(`/suppliers/calculate/${id}/${sq_ft}`);
      console.log(data);
      setPrice(data.total);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form className="flex gap-3 mb-5" action={handlePrice}>
        <input
          name="sq_ft"
          type="number"
          placeholder="4500"
          min={0}
          className="input w-full max-w-40 bg-transparent text-black border-black placeholder:text-black"
          required
        />

        {/* <button className="btn border-0 rounded-sm shadow-md bg-blue-500 uppercase">
          Calculate
        </button> */}

        <LoadingComponent
          className={'btn border-0 rounded-sm shadow-md bg-blue-500 uppercase'}
          text="Calculate"
        />
      </form>

      <div className="flex flex-col justify-between mb-5 max-w-md">
        <span className="font-bold text-2xl">
          <span className="block text-lg">Total</span>
          {price?.toFixed(2)}$
        </span>

        <VerifyModal />

        <DepositModal />
      </div>
    </>
  );
};

export default CalculateForm;
