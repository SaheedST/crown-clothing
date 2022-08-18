import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"; //Create new user record from Google authentication

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyD8gcYEcSb0KE6DNSGPa5RRpLAJtnyeeTo",

  authDomain: "crwn-shopping-db-dfe48.firebaseapp.com",

  projectId: "crwn-shopping-db-dfe48",

  storageBucket: "crwn-shopping-db-dfe48.appspot.com",

  messagingSenderId: "658148651490",

  appId: "1:658148651490:web:fe22321daafaa69bfec9bb",
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);

// User authentication with Google account
const googlePopupProvider = new GoogleAuthProvider();

googlePopupProvider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googlePopupProvider);

// Create new user record from Google authentication
export const db = getFirestore();

export const createUserDocFromAuth = async (userAuth, additionalInfo = {}) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "user", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  console.log(userSnapshot);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (error) {
      console.log("There was a problem creating user", error.message);
    }
  }
};

// User authentication with email and password
export const createUserWithEmailAndPasswordAuth = async (email, password) => {
  if (!email && !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};
