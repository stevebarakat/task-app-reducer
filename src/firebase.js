import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAr5rw-M8IAdUPJ1XFROZL98yKJ7P2_iuI",
  authDomain: "task-app-reducer.firebaseapp.com",
  projectId: "task-app-reducer",
  storageBucket: "task-app-reducer.appspot.com",
  messagingSenderId: "128813465750",
  appId: "1:128813465750:web:c89f10de87e33307b5c2b7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const firestore = firebase.firestore();