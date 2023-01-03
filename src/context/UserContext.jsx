import { sendSignInLinkToEmail } from 'firebase/auth';
import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const userEmail = (val) => {
    setEmail(val);
  };
  return (
    <UserContext.Provider value={{ email, userEmail }}>
      {children}
    </UserContext.Provider>
  )
}
