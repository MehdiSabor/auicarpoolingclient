// Import the required packages
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyCg86AfZX32rKnev360wS5HbdqQSpJ2jCo",
    authDomain: "auicarpooling.firebaseapp.com",
    databaseURL: "https://auicarpooling-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "auicarpooling",
    storageBucket: "auicarpooling.appspot.com",
    messagingSenderId: "216739711101",
    appId: "1:216739711101:web:4a9a6f79debd89ded24914",
    measurementId: "G-Z49QW0C62P"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(app);

// Export the required functions
export { ref, onValue, push, serverTimestamp, database };
