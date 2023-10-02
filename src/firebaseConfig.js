// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcS5LPtUL7JPQ7WkP9-u2iRLn1V7CE7yM",
  authDomain: "pembukuan-umkm.firebaseapp.com",
  projectId: "pembukuan-umkm",
  storageBucket: "pembukuan-umkm.appspot.com",
  messagingSenderId: "795643574532",
  appId: "1:795643574532:web:2f7b419ca1005f2670b851",
  measurementId: "G-H5R3Z38LVL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);

export default app;
