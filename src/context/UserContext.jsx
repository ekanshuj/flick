import React, { createContext, useState } from 'react';

export const UserContext = createContext();



export const UserProvider = ({ children }) => {
  return (
    <UserContext.Provider value="">
      {/* <UserContext.Provider value={{ handleSubmit }}> */}
      {children}
    </UserContext.Provider>
  )
}