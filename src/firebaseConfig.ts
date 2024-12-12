import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDStQYcuDBfK31zeZYLzIukVqm8g9RgBtw",
  authDomain: "safegate-20d87.firebaseapp.com",
  projectId: "safegate-20d87",
  storageBucket: "safegate-20d87.firebasestorage.app",
  messagingSenderId: "587967659850",
  appId: "1:587967659850:web:b321a602cf6b9983100bb3",
};
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export { auth, db };
