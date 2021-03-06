import React, { useEffect, useContext, useState, createContext } from "react";

import { firebase } from "./initFirebase";
const db = firebase.firestore();

const AuthContext = createContext({
  user: null,
  loading: true,
  logout: () => {},
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const cancelAuthListener = firebase.auth().onAuthStateChanged(async (u) => {
      if (u) {
        const { displayName, email, photoURL, uid } = u;
        setUser({
          displayName,
          email,
          photoURL,
          uid,
        });
        await new Promise((r) => setTimeout(r, 2000));
        setLoading(false);
        return;
      }
      await new Promise((r) => setTimeout(r, 2000));
      setUser(null);
      setLoading(false);
    });
    return () => cancelAuthListener();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, logout: () => firebase.auth().signOut() }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  return useContext(AuthContext);
}

const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

const signInWithGoogle = () => {
  auth
    .signInWithPopup(googleProvider)
    .then((res) => {
      db.collection("users").doc(res.user.uid).set({
        displayName: res.user.displayName,
        email: res.user.email,
        photoURL: res.user.photoURL,
        uid: res.user.uid,
        rate: 0,
      });
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export { AuthProvider, useAuth, signInWithGoogle };
