"use client";

import { initializeApp, type FirebaseApp } from "firebase/app";
import {
  getFirestore,
  initializeFirestore,
  memoryLocalCache,
  type Firestore,
} from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

function trimEnv(value: string | undefined): string | undefined {
  const t = value?.trim();
  return t || undefined;
}

const firebaseConfig = {
  apiKey: trimEnv(process.env.NEXT_PUBLIC_APIKEY),
  authDomain: trimEnv(process.env.NEXT_PUBLIC_AUTHDOMAIN),
  projectId: trimEnv(process.env.NEXT_PUBLIC_PROJECTID),
  storageBucket: trimEnv(process.env.NEXT_PUBLIC_STORAGEBUCKET),
  messagingSenderId: trimEnv(process.env.NEXT_PUBLIC_MESSAGINGSENDERID),
  appId: trimEnv(process.env.NEXT_PUBLIC_APPID),
  measurementId: trimEnv(process.env.NEXT_PUBLIC_MEASUREMENTID),
};

/** All values required before Firestore can build valid resource paths. */
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.storageBucket &&
    firebaseConfig.messagingSenderId &&
    firebaseConfig.appId
);

let firebaseApp: FirebaseApp | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;

if (isFirebaseConfigured) {
  firebaseApp = initializeApp(firebaseConfig);
  try {
    db = initializeFirestore(firebaseApp, {
      localCache: memoryLocalCache(),
    });
  } catch {
    db = getFirestore(firebaseApp);
  }
  storage = getStorage(firebaseApp);
}

export { storage, firebaseApp };
export default db;
