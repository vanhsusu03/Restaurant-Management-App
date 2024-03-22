// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA9PUeY4XbhZvXzlagC7Zp83g98Ir8RFVU",
  authDomain: "restaurantmanagerapp-2e7e5.firebaseapp.com",
  projectId: "restaurantmanagerapp-2e7e5",
  storageBucket: "restaurantmanagerapp-2e7e5.appspot.com",
  messagingSenderId: "994538386085",
  appId: "1:994538386085:web:8a61542b429e4cc39e134c",
  measurementId: "G-4W3T0YGXWH"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase }