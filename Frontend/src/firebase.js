// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "pratibimb-195c3.firebaseapp.com",
  projectId: "pratibimb-195c3",
  storageBucket: "pratibimb-195c3.appspot.com",
  messagingSenderId: "933516650065",
  appId: "1:933516650065:web:f7708b9163b11bdeceba70"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);