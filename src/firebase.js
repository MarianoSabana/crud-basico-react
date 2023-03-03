import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC5KoYhZAQ3Bu4pRnnzGdbT8t7-ZFrnGFs",
  authDomain: "crud-basico-react-ce1fb.firebaseapp.com",
  projectId: "crud-basico-react-ce1fb",
  storageBucket: "crud-basico-react-ce1fb.appspot.com",
  messagingSenderId: "689116079567",
  appId: "1:689116079567:web:2a293dff23849315759eba",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
