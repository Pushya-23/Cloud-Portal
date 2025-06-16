// /frontend/firebase.ts

import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, Auth } from "firebase/auth";
import { getAnalytics, Analytics } from "firebase/analytics";

// Firebase config from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};
console.log("FIREBASE CONFIG", firebaseConfig);

// Initialize app once
const app: FirebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Safely initialize analytics (browser only, avoid SSR errors)
let analytics: Analytics | undefined;
if (typeof window !== "undefined" && 'measurementId' in firebaseConfig) {
  try {
    analytics = getAnalytics(app);
  } catch (err) {
    console.warn("Firebase Analytics initialization skipped:", err);
  }
}


// Auth
const auth: Auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, auth, provider, analytics };
