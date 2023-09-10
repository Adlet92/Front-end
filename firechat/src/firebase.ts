
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAoPvtccVHS9O0DCqvw7JWAARdsdZpuX3Y",
  authDomain: "firechat-9c94b.firebaseapp.com",
  projectId: "firechat-9c94b",
  storageBucket: "firechat-9c94b.appspot.com",
  messagingSenderId: "1004688616155",
  appId: "1:1004688616155:web:c23fa55fd7a3cb30b73afe",
  measurementId: "G-5DE4F8RFFH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


export default app



