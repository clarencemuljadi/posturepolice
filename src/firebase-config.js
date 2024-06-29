import { initializeApp } from "firebase/app";
import {
  getFirestore, doc, getDoc, setDoc, updateDoc
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
export const auth = getAuth();

function detectSlouch() {
  const userID = 999;
  logSlouch(userID);
}

async function startSession(userID) {
  try {
    const currentDate = new Date().toISOString().split('T')[0];

    const userDocRef = doc(db, 'users', userID);

    const userDoc = await getDoc(userDocRef);
    let slouchStatistics = userDoc.data().slouchStatistics || {};

    const sessionsToday = slouchStatistics[currentDate] || {};
    const latestSessionID = Object.keys(sessionsToday).length;
    const newSessionID = `session${latestSessionID + 1}`;

    const sessionData = {
      startedAt: new Date(),
      endedAt: new Date(), // Implement in endSession
      duration: 0,
      slouchCounts: 0
    };

    slouchStatistics[currentDate] = {
      ...sessionsToday,
      [newSessionID]: sessionData
    };

    await updateDoc(userDocRef, { slouchStatistics });

    return newSessionID;
  } catch (error) {
    console.error(error);
  }
}

async function logSlouch(userID) {
  try {
    const currentDate = new Date().toISOString().split('T')[0];

    const userDocRef = doc(db, 'users', userID);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists) {
      throw new Error("User document does not exist");
    }

    const userData = userDoc.data();
    const slouchCounts = userData.slouchCounts || {};

    const newCount = (slouchCounts[currentDate] || 0) + 1;
    slouchCounts[currentDate] = newCount;

    await updateDoc(userDocRef, { slouchCounts });
  } catch (error) {
    console.error(error);
  }
}

export async function signUp(email, password, name) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    await setDoc(doc(db, "users", uid), {
      name: name
    });

    return userCredential.user;
  } catch (error) {
    console.error(error);
  }
}

export async function logIn(email, password) {
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    return userCredential.user;
  })
  .catch((error) => {
    console.error(error);
  });
}

export async function logOut() {
  signOut(auth).then(() => {
    // Sign-out successful.
  })
  .catch((error) => {
    console.error(error);
  });
}
