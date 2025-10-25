import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDZp2a_mRUBdgQzHesKnWMscGocRRhEhcM",
  authDomain: "fir-project-2807c.firebaseapp.com",
  projectId: "fir-project-2807c",
  storageBucket: "fir-project-2807c.firebasestorage.app",
  messagingSenderId: "649434372203",
  appId: "1:649434372203:web:15651b857161e5ae41b92e",
  measurementId: "G-78NZJHFTKH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
