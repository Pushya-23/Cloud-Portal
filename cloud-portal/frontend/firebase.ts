// /frontend/firebase.ts

import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, Auth } from "firebase/auth";
import { getAnalytics, Analytics, isSupported as analyticsSupported } from "firebase/analytics";

// Safely pull config from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!,
};

console.log("FIREBASE CONFIG", firebaseConfig);

// Initialize Firebase app once
const app: FirebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize analytics (only in browser, if supported)
let analytics: Analytics | undefined;
if (typeof window !== "undefined" && firebaseConfig.measurementId) {
  analyticsSupported()
    .then((isSupported) => {
      if (isSupported) {
        analytics = getAnalytics(app);
      }
    })
    .catch((err) => {
      console.warn("Firebase Analytics not supported:", err);
    });
}

// Initialize Firebase Auth
const auth: Auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Exports
export { app, auth, provider, analytics };
