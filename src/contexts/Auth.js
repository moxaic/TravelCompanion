import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const useAuthContext = () => useContext(AuthContext);

const Auth = ({ children }) => {
  const [name, setName] = useState(null);
  const [username, setUsername] = useState(null);

  return (
    <AuthContext.Provider value={{ name, username, setName, setUsername }}>
      {children}
    </AuthContext.Provider>
  );
};

export { useAuthContext };
export default Auth;
