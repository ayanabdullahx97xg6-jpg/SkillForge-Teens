// File: src/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Apni Firebase console se apni exact configuration yahan lagayein
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "skillforge-teens",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Firebase app ko initialize karein
const app = initializeApp(firebaseConfig);

// Firestore database instance export karein taake baaki files mein use ho sake
export const db = getFirestore(app);
