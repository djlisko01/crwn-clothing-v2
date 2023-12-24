// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc, // create a document reference
  getDoc, // read a document
  setDoc, // write a document
} from "firebase/firestore";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzQm3pjHl-lqa5wybqh3AO1DNtE7mMkDU",
  authDomain: "crwn-clothing-v2-33034.firebaseapp.com",
  projectId: "crwn-clothing-v2-33034",
  storageBucket: "crwn-clothing-v2-33034.appspot.com",
  messagingSenderId: "84704300330",
  appId: "1:84704300330:web:aeabf94012651ef69a2253",
  measurementId: "G-CFN2STFEWT",
};

// ---------------------------------------- Initialize Firebase ---------------------------------------- //
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const googleProvider = new GoogleAuthProvider();

// Can tell different ways we want this google provider behave
googleProvider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();
// this is the function that will trigger the google pop up whenever
//  we use this google auth provider for authentication and sign in
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// ---------------------------------------- User Authentication ---------------------------------------- //

const db = getFirestore();

// User Auth with gmail
export const createUserDocumentFromAuth = async (
  userAuth,
  additionInformation = {},
) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  // console.log(userSnapshot.exists());
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionInformation,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
};

// User Auth with Email and Password
export const createAuthWithEmailAndPassword = async (email, password) => {
  // sourcery skip: use-braces
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

// ---------------------------------------- User Sign In With Email ---------------------------------------- //
export const userEmailSignIn = async (email, password) => {
  console.log("SIGNING IN");
  return await signInWithEmailAndPassword(auth, email, password);
};

// ---------------------------------------- User Sign Out ---------------------------------------- //
export const userAuthSignOut = async () => {
  await signOut(auth);
};

// ---------------------------------------- Auth Observer ---------------------------------------- //
export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);
};