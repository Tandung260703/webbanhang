// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsnvDZ3HfgbbV-VGIh-vgjLJpaCzlorac",
  authDomain: "webshop-999bb.firebaseapp.com",
  projectId: "webshop-999bb",
  storageBucket: "webshop-999bb.firebasestorage.app",
  messagingSenderId: "1009368590969",
  appId: "1:1009368590969:web:d8d83bd523ccf2b11982a8",
  measurementId: "G-NVZFVB2NC0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth=getAuth(app);
const provider=new GoogleAuthProvider()

export{auth,provider,signInWithPopup,signOut}