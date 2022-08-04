// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgRlUFsanyNwXQyEZAee00VHjq9Ic_KMk",
  authDomain: "coveredcall-4d8ef.firebaseapp.com",
  projectId: "coveredcall-4d8ef",
  storageBucket: "coveredcall-4d8ef.appspot.com",
  messagingSenderId: "559583776109",
  appId: "1:559583776109:web:fb8d42b736496f02b51e64",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
