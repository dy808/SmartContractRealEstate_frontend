import * as firebase from 'firebase'

import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth'

import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqao-Q4SUjU5a8PS87fK3KPMThTiCnheE",
  authDomain: "bejamas-b4221.firebaseapp.com",
  databaseURL: "https://bejamas-b4221-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "bejamas-b4221",
  storageBucket: "bejamas-b4221.appspot.com",
  messagingSenderId: "556527863050",
  appId: "1:556527863050:web:ab8837415f3f6bad3326f3"
};



firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage }