import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
import { getStorage } from "firebase/storage";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDkc1WHnuYkFiR7Z7Nz7Zxbhi0icZr9eGk",
  authDomain: "qodsona-cf756.firebaseapp.com",
  projectId: "qodsona-cf756",
  storageBucket: "qodsona-cf756.appspot.com",
  messagingSenderId: "603265524544",
  appId: "1:603265524544:web:860c1f17c06df1b5eb90a5"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const auth = getAuth()
export const db = getFirestore(app)

export default app
