// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASR4zHhTp88YBWYNkMIDB7QKbIRIzsqOs",
  authDomain: "db-for-s3.firebaseapp.com",
  projectId: "db-for-s3",
  storageBucket: "db-for-s3.appspot.com",
  messagingSenderId: "810182327163",
  appId: "1:810182327163:web:58f6e5bde445e53925dbde",
  measurementId: "G-HFED03SC0B"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);