'use client';
import LoadingComponent from '@/components/LoadingComponent';
import { UserContext } from '@/context';
import { getError } from '@/utilities/getError';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';

const LogInPage = () => {
  const { dispatch } = useContext(UserContext);

  const handleSubmit = async (formData) => {
    console.log('ALO');

    const payload = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    try {
      const { data } = await axios.post('/users/login', payload);
      dispatch({ type: 'LOG_IN', payload: data });
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <main className="max-w-lg mx-auto mt-10 px-5">
      <form
        action={handleSubmit}
        className="shadow-xl px-3 py-5 rounded-lg bg-white"
      >
        <input
          name="email"
          placeholder="email"
          required
          type="email"
          className="input mb-5"
        />
        <input
          name="password"
          placeholder="password"
          required
          type="password"
          className="input mb-5"
        />

        <LoadingComponent className="btn w-full" />
      </form>
    </main>
  );
};

export default LogInPage;
