// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-c0466.firebaseapp.com",
  projectId: "mern-estate-c0466",
  storageBucket: "mern-estate-c0466.appspot.com",
  messagingSenderId: "68547298964",
  appId: "1:68547298964:web:cdf6dcd31012ac52c6d681"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);