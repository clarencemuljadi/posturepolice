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

// YYYY-MM-DD
const currDate = new Date().toISOString().split('T')[0];
const currentUser = auth.currentUser;
const userUID = currentUser.uid;
const userDocRef = doc(db, 'users', userUID);

export async function getUserDoc() {
  const userDoc = await getDoc(userDocRef);
  if (!userDoc.exists()) throw new Error("User document does not exist");
  return userDoc;
}

function detectSlouch() {

}

async function startSession() {
  try {
    const userDoc = getUserDoc();

    let slouchStatistics = userDoc.data().slouchStatistics || {};

    const sessionsToday = slouchStatistics[currDate] || {};
    const sessionIDs = Object.keys(sessionsToday).sort();
    if (sessionIDs.length > 0) {
      const latestSessionID = sessionIDs[sessionIDs.length - 1];
      const latestSessionData = sessionsToday[latestSessionID];
      if (!latestSessionData.endedAt) {
        console.log(`An ongoing session already exists for user ${userDoc.data().name}: ${latestSessionID}`);
        return latestSessionID;
      }
    }

    const latestSessionNumber = sessionIDs.length;
    const newSessionID = `session${latestSessionNumber + 1}`;

    const sessionData = {
      startedAt: new Date(),
      duration: 0,
      slouchCounts: 0
    };

    slouchStatistics[currDate] = {
      ...sessionsToday,
      [newSessionID]: sessionData
    };

    await updateDoc(userDocRef, { slouchStatistics });

    return newSessionID;
  } catch (error) {
    console.error(error);
  }
}

async function endSession() {
  try {
    const { sessionID, sessionData } = await getOngoingSession();

    const sessionEnd = new Date();
    const sessionStart = new Date(sessionData.startedAt);
    const sessionDuration = (sessionEnd - sessionStart) / 1000; // seconds

    sessionData.endedAt = sessionEnd;
    sessionData.duration = sessionDuration;

    const userDoc = getUserDoc();
    let slouchStatistics = userDoc.data().slouchStatistics || {};
    let sessionsToday = slouchStatistics[currDate] || {};
    sessionsToday[sessionID] = sessionData;
    slouchStatistics[currDate] = sessionsToday;

    await updateDoc(userDocRef, { slouchStatistics });
  } catch (error) {
    console.error(error);
  }
}

// Find the ongoing session (session without endedAt)
async function getOngoingSession() {
  try {
    const userDoc = getUserDoc();
    if (!userDoc.exists()) throw new Error("User document does not exist");

    let slouchStatistics = userDoc.data().slouchStatistics || {};
    let sessionsToday = slouchStatistics[currDate] || {};

    for (const [sessionID, session] of Object.entries(sessionsToday)) {
      if (!session.endedAt) {
        return { sessionID, sessionData: session };
      }
    }

    throw new Error("No ongoing session found for today");
  } catch (error) {
    console.error(error);
  }
}

export async function signUp(email, password, name) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    await setDoc(doc(db, "users", uid), {
      name
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
