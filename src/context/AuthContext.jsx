import { createContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const saveAuthInfo = (info) => {
    console.log(info);
  };
  const value = {
    saveAuthInfo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
