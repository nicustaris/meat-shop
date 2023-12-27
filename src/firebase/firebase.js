import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9F_kZ_9SLhsWiMJNkrm9Tn54Q8dW5zmI",
  authDomain: "hotel-dashboar.firebaseapp.com",
  projectId: "hotel-dashboar",
  storageBucket: "hotel-dashboar.appspot.com",
  messagingSenderId: "560185031782",
  appId: "1:560185031782:web:3bc1c976fece93043341a7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
