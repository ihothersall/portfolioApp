// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD2FyBNDWkbEhjL43FAcacHz4L6Ca_MVc0",
    authDomain: "portfolio-2be9e.firebaseapp.com",
    projectId: "portfolio-2be9e",
    storageBucket: "portfolio-2be9e.appspot.com",
    messagingSenderId: "354312418426",
    appId: "1:354312418426:web:99972e42bffb8195f137c3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const infoCollection = collection(db, "info")
export const videosCollection = collection(db, "videos")
export const cardsCollection = collection(db, "cards")
export const lightboxesCollection = collection(db, "lightboxes")
export const auth = getAuth(app);



