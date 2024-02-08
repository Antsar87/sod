/* eslint-disable react/prop-types */
import axios from 'axios';
import { useReducer } from 'react';
import { UserContext } from './UserContext';

// MiReducer.js
let initialState = { userInfo: {} };

if (typeof window !== 'undefined') {
  initialState = {
    userInfo: JSON.parse(localStorage.getItem('user')) || {},
  };
}

axios.defaults.headers.common[
  'Authorization'
] = `Bearer ${initialState?.userInfo.token}`;

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOG_IN':
      localStorage.setItem('user', JSON.stringify(action.payload));

      // Colocando token globalmente
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${action.payload.token}`;

      return { ...state, userInfo: { ...action.payload } };

    case 'LOG_OUT':
      localStorage.removeItem('user');

      // Removiendo token globalmente
      axios.defaults.headers.common['Authorization'] = null;

      return { ...state, userInfo: {} };

    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
