'use client';

import LoadingComponent from '@/components/LoadingComponent';
import { getError } from '@/utilities/getError';
import axios from 'axios';
import { redirect, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const params = useSearchParams();
  const zipcode = params.get('zipcode');

  console.log(zipcode);

  if (!zipcode) {
    redirect('/');
  }

  const handleSubmit = async (FormData) => {
    setLoading(true);
    const dataForm = {
      name: FormData.get('name'),
      address: FormData.get('address'),
      city: FormData.get('city'),
      state: FormData.get('state'),
      zip: FormData.get('zip'),
      email: FormData.get('email'),
    };

    try {
      const { data } = await axios.post('/users/contact', dataForm);

      toast.success(data.message);
      console.log(data);
    } catch (error) {
      toast.error(getError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <header className="zipCode text-center py-20">
        <div className="container max-w-4xl">
          <h1 className="uppercase text-4xl mb-5 text-pretty font-bold">
            GET IN TOUCH WITH US
          </h1>
        </div>
      </header>

      <div className="container max-w-3xl mt-10">
        <p className="text-xl text-pretty">
          Zip Code {zipcode} is not currently available. Do you feel that this
          might be an error, or are you a client in an adjoining zip code? If
          so, please send us a note and one of our TEAM members will be back in
          touch ASAP!
        </p>

        <form className="mt-10" action={handleSubmit}>
          <div className="flex gap-5 flex-col md:flex-row mb-5">
            <input
              type="text"
              required
              className="input"
              placeholder="name"
              name="name"
            />
            <input
              type="text"
              required
              className="input"
              placeholder="address"
              name="address"
            />
          </div>

          <div className="flex gap-5 flex-col md:flex-row mb-5">
            <input
              type="text"
              required
              className="input"
              placeholder="city"
              name="city"
            />
            <input
              type="text"
              required
              className="input"
              placeholder="state"
              name="state"
            />
            <input
              type="text"
              required
              className="input"
              placeholder="zip"
              name="zip"
            />
          </div>

          <input
            type="email"
            name="email"
            required
            className="input mb-5"
            placeholder="email"
          />

          <button className="btn w-full" disabled={loading}>
            {' '}
            <LoadingComponent isLoading={loading} text="Get in touch" />
          </button>
        </form>
      </div>
    </main>
  );
};

export default ContactUs;
