// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAo1GBEYbcCW25325bUPgDXm3wlgvlVhLE",
  authDomain: "agribridge-51e74.firebaseapp.com",
  projectId: "agribridge-51e74",
  storageBucket: "agribridge-51e74.firebasestorage.app",
  messagingSenderId: "504872346139",
  appId: "1:504872346139:web:cbc3332a8b398d227c0ebe",
  measurementId: "G-2VN33336KT",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);