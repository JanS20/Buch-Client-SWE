import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export const AuthProvider = ({ children }) => {
  const [Token, setToken] = useState('');
  const [writeAccess, setWriteAccess] = useState(false);

  useEffect(() => {
    if (Token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${Token}`;
      console.log('Token set in axios headers:', Token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      console.log('Token removed from axios headers');
    }
  }, [Token]);

  const login = async (username, password) => {
    try {
      const response = await loginUser({ username, password });
      const { data: { access_token, roles } } = response;
      setToken(access_token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

      const isAdmin = roles.includes('admin');
      const isKunde = roles.includes('kunde');
      setWriteAccess(isAdmin);

      return isAdmin || isKunde;
    } catch (error) {
      return false;
    }
  };

  const loginUser = async ({ username, password }) => {
    const url = '/api/auth/login';
    const requestData = {
      username: encodeURIComponent(username),
      password: encodeURIComponent(password)
    };

    try {
      const response = await axios.post(url, requestData);
      return response;
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const logout = () => {
    setToken('');
    setWriteAccess(false);
    delete axios.defaults.headers.common['Authorization'];
    console.log('User logged out, token cleared');
  };

  const isLoggedIn = () => {
    return Token !== '';
  };

  return (
    <AuthContext.Provider value={{ Token, writeAccess, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const AuthContext = createContext(null);
