import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export const AuthProvider = ({ children }) => {
  const [Token, setToken] = useState('');
  const [writeAccess, setWriteAccess] = useState(false);

  const login = async (username, password) => {
    try {
      // destructuring
      const { data: { token, roles } } = await loginUser({ username, password });
      setToken(token);

      const isAdmin = roles.includes('admin');
      const isKunde = roles.includes('kunde');
      setWriteAccess(isAdmin);

      return isAdmin || isKunde;
    } catch (error) {
      return false;
    }
  };

  const loginUser = async ({ username, password }) => {
    const url = '/auth/login';
    const requestData = {
      username: encodeURIComponent(username),
      password: encodeURIComponent(password)
    };

    try {
      const response = await axios.post(url, requestData);
      return response;
    } catch (error) {
      //axios wirft standardmäßig Fehler wirft, wenn der Statuscode nicht im Bereich 200 liegt
      throw new Error('Login failed');
    }
  };

  const logout = () => {
    setToken('');
    setWriteAccess(false);
  };

  const isLoggedIn = () => {
    return (Token !== '')
  }

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
