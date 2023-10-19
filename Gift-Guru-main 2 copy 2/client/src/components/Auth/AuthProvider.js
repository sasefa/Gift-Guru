import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create context
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Code for actions on mount and unmount
  }, []);

  const loginUser = async (formData) => {
    try {
      const response = await axios.post('/api/auth/login', formData);
      if (response.status === 200) {
        setCurrentUser(response.data.user);
        return true;
      }
    } catch (e) {
      console.log(e);
    }
    return false;
  };
  
  const registerUser = async (formData) => {
    try {
      const response = await axios.post('/api/auth/signup', formData);
      if (response.status === 200) {
        setCurrentUser(response.data.user);
        return true;
      }
    } catch (e) {
      console.log(e);
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ currentUser, loginUser, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
