import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAWc1HAKPSuAuoF4O8ODmrHLw6vZBQcfjk",
  authDomain: "realtime-chat-468119.firebaseapp.com",
  projectId: "realtime-chat-468119",
  storageBucket: "realtime-chat-468119.firebasestorage.app",
  messagingSenderId: "721671626144",
  appId: "1:721671626144:web:28a8953b8619071472d8c5",
  measurementId: "G-3J7E1R5NL1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const signIn = () => signInWithPopup(auth, provider);