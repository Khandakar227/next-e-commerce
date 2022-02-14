import { useState, useEffect, useContext, createContext } from "react";
import { auth, db } from "../config/firebase";

const authContext = createContext();
export function AuthProvider({ children }) {
  const authData = useProvideAuth();

  return <authContext.Provider value={authData}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  console.log("useAuth");
  return useContext(authContext);
};
function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getCurrentUser = async () => {
    try {
      if (!auth.currentUser?.uid) return;

      const doc = await db.collection("Users").doc(auth.currentUser?.uid).get();
      const userData = {
        emailVerified: auth.currentUser.emailVerified,
        uid: auth.currentUser?.uid,
        ...doc.data(),
      }
      Object.defineProperty(userData, 'emailVerified', { //Making a logged in user object with immutable properties.
        value: auth.currentUser.emailVerified,
        writable: false
      })
      Object.defineProperty(userData, 'uid', { //Making a logged in user object with immutable properties.
        value: auth.currentUser.uid,
        writable: false
      })
      setUser(userData);
      console.log(userData)
    } catch (error) {
      console.log(error)
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async () => await getCurrentUser());

    return unsubscribe
  }, []);

  return {
    user,
    loading,
    setUser,
  };
}
