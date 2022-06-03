import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const saveAuthInfo = (info) => {
    //  save token into local storage
    localStorage.setItem('issue-tracker-token', info.jwt);
    //  save user info into state
    setUser({
      id: info.user.id,
      username: info.user.username,
      email: info.user.email,
    });
    console.log(info);
  };

  const value = {
    saveAuthInfo,
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
