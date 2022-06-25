import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBOlaPH-Z-KHicb9deVdhz8WclpS2rSnn8",
  authDomain: "blog-post-a389e.firebaseapp.com",
  databaseURL: "https://blog-post-a389e-default-rtdb.firebaseio.com",
  projectId: "blog-post-a389e",
  storageBucket: "blog-post-a389e.appspot.com",
  messagingSenderId: "242550251015",
  appId: "1:242550251015:web:8373d763d14ce4cf0614a2",
  measurementId: "G-RYN67JLPQR",
};

export const app = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

const auth = getAuth();

export { googleProvider, auth };
