import { initializeApp } from "firebase/app";
import {
  getFirestore, doc, setDoc
} from 'firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, signOut
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAqwQcPQi_fS0QTLEOATgido_IqRHRK7As",
  authDomain: "posturepolice-7e2d1.firebaseapp.com",
  projectId: "posturepolice-7e2d1",
  storageBucket: "posturepolice-7e2d1.appspot.com",
  messagingSenderId: "21511471109",
  appId: "1:21511471109:web:f3d1391337011f78679c6c",
  measurementId: "G-7S3EK8L1VJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

function detectSlouch() {
  const userID = 999;
  logSlouch(userID);
}

function logSlouch(userID) {
  console.log("Slouched");
}

async function signUp(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    setDoc(doc(db, "users", user.uid), {
      email
    });
  })
  .catch((error) => {
    console.error(error)
  });
}

async function logIn(email, password) {
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
  })
  .catch((error) => {
    console.error(error);
  });
}

async function logOut() {
  signOut(auth).then(() => {
    // Sign-out successful.
  })
  .catch((error) => {
    console.error(error);
  });
}
