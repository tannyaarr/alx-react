import React, { createContext, useState } from 'react';

const defaultUser = {
    email: '',
    password: '',
    isLoggedIn: false
  };
  
  const defaultLogOut = () => {};
  
  const AppContext = createContext({
    user: defaultUser,
    logOut: defaultLogOut
  });
  
  export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(defaultUser);
  

    const logIn = (email, password) => {
      setUser({
        email,
        password,
        isLoggedIn: true
      });
    };
  
    const logOut = () => {
      setUser(defaultUser);
    };
  
    return (
      <AppContext.Provider value={{ user, logIn, logOut }}>
        {children}
      </AppContext.Provider>
    );
  };
  
  export default AppContext;