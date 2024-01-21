'use client';

import LoadingComponent from './LoadingComponent';
import { toast } from 'react-toastify';
import { getError } from '@/utilities/getError';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const ZipCodeForm = () => {
  const router = useRouter();

  const handleSubmit = async (formData) => {

    try {
      const { data } = await axios.get(
        `/users/zipcode/${formData.get('zipcode')}`
      );
      console.log(data);
      toast.success(data.message);
      router.push(`/sods`);
    } catch (error) {
      toast.error(getError(error));
      router.push(`/contactUs?zipcode=${formData.get('zipcode')}`);
    }
  };

  return (
    <form className="flex justify-center gap-3" action={handleSubmit}>
      <input
        placeholder="ZIPCODE"
        className="input input-bordered w-full max-w-xs text-black"
        type="text"
        name="zipcode"
        required
      />
      <LoadingComponent
        className="btn bg-green-500 rounded-lg"
        text="Get started"
      />
    </form>
  );
};

export default ZipCodeForm;
