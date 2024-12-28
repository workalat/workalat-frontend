// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: "chat-app-dd2e2.firebaseapp.com",
  projectId: "chat-app-dd2e2",
  storageBucket: "chat-app-dd2e2.firebasestorage.app",
  messagingSenderId: "179102740567",
  appId: "1:179102740567:web:26086d41d820d614477312"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
