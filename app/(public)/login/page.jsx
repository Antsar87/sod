'use client';
import LoadingComponent from '@/components/LoadingComponent';
import { UserContext } from '@/context';
import { getError } from '@/utilities/getError';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';

const LogInPage = () => {
  const { dispatch } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('ALO');

    const payload = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const { data } = await axios.post('/users/login', payload);
      dispatch({ type: 'LOG_IN', payload: data });
    } catch (error) {
      toast.error(getError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-lg mx-auto mt-10 px-5">
      <form
        onSubmit={handleSubmit}
        className="shadow-xl px-3 py-5 rounded-lg bg-white"
      >
        <input
          name="email"
          placeholder="email"
          required
          type="email"
          className="input mb-5"
          disabled={loading}
        />
        <input
          name="password"
          placeholder="password"
          required
          type="password"
          className="input mb-5"
          disabled={loading}
        />

        <button className="btn w-full" disabled={loading}>
          <LoadingComponent isLoading={loading} />
        </button>
      </form>
    </main>
  );
};

export default LogInPage;
