// /src/utils/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB4E-IxhPp8MKR9gKkdcM7w3e9CTkiWWMU",
  authDomain: "coolculina.firebaseapp.com",
  projectId: "coolculina",
  storageBucket: "coolculina.appspot.com",
  messagingSenderId: "109137905089",
  appId: "1:109137905089:web:473e3cc74b065c74e79b40",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Set the persistence to local (This will keep the authentication state even after the app is closed or refreshed)
setPersistence(auth, browserLocalPersistence)
  .catch(function(error) {
    console.log("Error setting persistence:", error);
  });

export { db, app, auth };



