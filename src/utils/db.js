
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";




const firebaseConfig = {
  apiKey: "AIzaSyByTsJKyI3XhPqDs7zg9WCx-jN2Oupbf6g",
  authDomain: "contact-book-5c048.firebaseapp.com",
  projectId: "contact-book-5c048",
  storageBucket: "contact-book-5c048.firebasestorage.app",
  messagingSenderId: "1048759829173",
  appId: "1:1048759829173:web:b8c06892c4a93a9bcab4fc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
    
export { db };