// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBoWeLo7yHXTgYHMEwSUPnZ-63ESu34gzI",
    authDomain: "chat-people-b600b.firebaseapp.com",
    projectId: "chat-people-b600b",
    storageBucket: "chat-people-b600b.firebasestorage.app",
    messagingSenderId: "244016771166",
    appId: "1:244016771166:web:e75095e7089358719c84cf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, signInAnonymously };
