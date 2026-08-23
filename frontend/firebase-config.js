import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAimLwQCq2XzCuQpDOLhkTJj_Sb_jHZDrc",
  authDomain: "boxdup-9ac42.firebaseapp.com",
  projectId: "boxdup-9ac42",
  storageBucket: "boxdup-9ac42.firebasestorage.app",
  messagingSenderId: "828458997700",
  appId: "1:828458997700:web:234a471c087eb279b1b691",
  measurementId: "G-1GFCSFYX4J",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const API_BASE = "https://boxdup.onrender.com";
