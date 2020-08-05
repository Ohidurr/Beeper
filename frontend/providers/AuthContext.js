import React, { createContext, useState, useEffect } from "react";
import firebase from "../firebase";
import { getFirebaseToken } from "../util/firebaseFunctions";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);

  const updateUser = (user) => {
    if (user) {
      const { email, uid } = user;
      setCurrentUser({ email, id: uid });
      getFirebaseToken().then((token) => {
        setToken(token);
        setLoading(false);
      });
    } else {
      setToken(null);
      setCurrentUser(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(updateUser);
    return unsubscribe;
  }, []);

  if (loading) return <div>LOADING............</div>;

  return (
    <AuthContext.Provider value={{ currentUser, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
