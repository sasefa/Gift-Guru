import React, { createContext, useState, useEffect } from 'react';

// Create context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // State
  const [currentUser, setCurrentUser] = useState(null);

  // On mount & will unmount
  useEffect(() => {
    // Your Login/Register/Logout Functions Here
    // This will keep track of User State
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;