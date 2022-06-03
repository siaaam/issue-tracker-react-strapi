import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import useToken from '../hooks/useToken';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { token, loaded } = useToken();

  async function loadUser() {
    const res = await axios.get('http://localhost:1337/api/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(res.data);
    const info = res.data;

    setUser({
      id: info.id,
      username: info.username,
      email: info.email,
    });
  }

  const removeAuthInfo = () => {
    setUser(null);
    localStorage.removeItem('issue-tracker-token');
  };

  useEffect(() => {
    if (loaded) {
      loadUser();
    }
  }, [loaded]);

  const saveAuthInfo = (info) => {
    //  save token into local storage
    localStorage.setItem('issue-tracker-token', info.jwt);
    //  save user info into state
    setUser({
      id: info.user.id,
      username: info.user.username,
      email: info.user.email,
    });
  };

  const value = {
    saveAuthInfo,
    removeAuthInfo,
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
