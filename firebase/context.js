import React, { useState, useEffect, useContext, createContext } from "react";
import { firebase, auth, db } from "../config/firebase";

const authContext = createContext();
export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
export const useAuth = () => {
  console.log("useAuth");
  return useContext(authContext);
};
function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getCurrentUser = () => {
    auth.currentUser?.uid
      ? db
        .collection("Users")
        .doc(auth.currentUser.uid)
        .get()
        .then((doc) => {
          const userData = {
            emailVerified: auth.currentUser.emailVerified,
            uid: auth.currentUser.uid,
            ...doc.data()
          }

          Object.defineProperty(userData, 'emailVerified', {
            value: auth.currentUser.emailVerified
          })
          Object.defineProperty(userData, 'uid', {
            value: auth.currentUser.uid
          })

          setUser(userData);
          setLoading(false);
        })
      : setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged(() => getCurrentUser());
    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    setUser,
  };
}
