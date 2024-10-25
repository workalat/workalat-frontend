// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: "reactchat-3e324.firebaseapp.com",
  projectId: "reactchat-3e324",
  storageBucket: "reactchat-3e324.appspot.com",
  messagingSenderId: "83342077201",
  appId: "1:83342077201:web:cb923947e25c24a02b30b0",
  measurementId: "G-V4NQ41WPD2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
