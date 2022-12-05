import { initializeFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAOekl3HH56DUNdk5LJmdC1d89DxAKT3cU",
  authDomain: "testproject-24c36.firebaseapp.com",
  projectId: "testproject-24c36",
  storageBucket: "testproject-24c36.appspot.com",
  messagingSenderId: "319776357301",
  appId: "1:319776357301:web:606b48cf95641a9819f7fc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export { db }
