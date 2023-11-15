// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1O53HWyM5B1esmYiHtSk0QS8x2cI2yKw",
  authDomain: "testingsite-f27dc.firebaseapp.com",
  projectId: "testingsite-f27dc",
  storageBucket: "testingsite-f27dc.appspot.com",
  messagingSenderId: "156922291724",
  appId: "1:156922291724:web:fc012ad93d090c7ecd3029",
  measurementId: "G-PW231BBG1G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);