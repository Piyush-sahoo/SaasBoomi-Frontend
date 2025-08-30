import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
// Avoid importing analytics on the server; load lazily in browser if needed.
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider, browserLocalPersistence, type Auth } from "firebase/auth";

// Firebase config provided by the user
const firebaseConfig = {
  apiKey: "AIzaSyDIDGut_bYuABjD7sUazO8RuHuzZHQUwPg",
  authDomain: "saasbhoomi.firebaseapp.com",
  databaseURL: "https://saasbhoomi-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "saasbhoomi",
  storageBucket: "saasbhoomi.firebasestorage.app",
  messagingSenderId: "49698065836",
  appId: "1:49698065836:web:6cf9984b11979ff27abe09",
  measurementId: "G-ZEP11E4Q69",
};

let app: FirebaseApp;
let analytics: any | undefined;
let auth: Auth;
let db = getFirestore; // placeholder reassigned below
let rtdb = getDatabase; // placeholder reassigned below

// Initialize (avoid reinit in Fast Refresh)
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Lazy-load analytics only in the browser to prevent SSR bundling issues
if (typeof window !== "undefined") {
  import("firebase/analytics").then(({ isSupported, getAnalytics }) => {
    isSupported().then((ok: boolean) => {
      if (ok) analytics = getAnalytics(app);
    });
  }).catch(() => {});
}

auth = getAuth(app);
db = getFirestore(app);
rtdb = getDatabase(app);
auth.setPersistence(browserLocalPersistence);

const googleProvider = new GoogleAuthProvider();

// Export Firestore instance
export { app, analytics, auth, googleProvider, db, rtdb };
