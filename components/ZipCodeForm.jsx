'use client';

import { useState } from 'react';
import LoadingComponent from './LoadingComponent';
import { toast } from 'react-toastify';
import { getError } from '@/utilities/getError';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const ZipCodeForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const { data } = await axios.get(
        `/users/zipcode/${e.target.zipcode.value}`
      );
      console.log(data);
      toast.success(data.message);
    } catch (error) {
      toast.error(getError(error));
      router.push(`/contactUs?zipcode=${e.target.zipcode.value}`)
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex justify-center gap-3" onSubmit={handleSubmit}>
      <input
        placeholder="ZIPCODE"
        className="input input-bordered w-full max-w-xs text-black"
        type="text"
        name="zipcode"
        required
        disabled={loading}
      />
      <button className="btn bg-green-500 rounded-lg" disabled={loading}>
        {' '}
        <LoadingComponent isLoading={loading} text="Get started" />
      </button>
    </form>
  );
};

export default ZipCodeForm;
