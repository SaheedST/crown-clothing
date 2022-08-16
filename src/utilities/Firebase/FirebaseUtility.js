import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
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

// User authentication
const provider = new GoogleAuthProvider();

provider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// Create new user record from Google authentication
export const db = getFirestore();

export const createUserFromAuth = async (userAuth) => {
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
      });
    } catch (error) {console.log('There was a problem creating user', error.message)}
  }
};
