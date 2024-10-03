import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCKZVYbhvKRLgaJiZENRCu_FIUlBjUwD7s",
  authDomain: "bikermarket-c679b.firebaseapp.com",
  projectId: "bikermarket-c679b",
  storageBucket: "bikermarket-c679b.appspot.com",
  messagingSenderId: "817855936079",
  appId: "1:817855936079:web:a7a4765b1e3925bfcb9c3a",
  measurementId: "G-VLLD2ZHW8E",
};

export const app = initializeApp(firebaseConfig);
export const firebaseAuth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);