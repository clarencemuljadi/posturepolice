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
function getCurrDate() {
  const options = { timeZone: 'Australia/Sydney', year: 'numeric', month: '2-digit', day: '2-digit' };
  const date = new Date().toLocaleDateString('en-CA', options);
  return date;
}

function getUserUID() {
  if (!auth) throw new Error("Auth does not exist");
  return auth.currentUser.uid;
}

function getUserDocRef() {
  return doc(db, 'users', getUserUID());
}

async function getUserDoc() {
  const userDoc = await getDoc(getUserDocRef());
  if (!userDoc.exists) throw new Error("User document does not exist");
  return userDoc;
}

export async function startSession() {
  try {
    const userDoc = await getUserDoc();

    const slouchStatistics = userDoc.data().slouchStatistics || {};

    const sessionsToday = slouchStatistics[getCurrDate()] || {};
    const sessionIDs = Object.keys(sessionsToday).sort();
    if (sessionIDs.length > 0) {
      const latestSessionID = sessionIDs[sessionIDs.length - 1];
      const latestSessionData = sessionsToday[latestSessionID];
      if (!latestSessionData.endedAt) {
        console.log(`An ongoing session already exists for user ${userDoc.data().name}: ${latestSessionID}`);
        return latestSessionID;
      }
    }

    const newSessionID = `session${sessionIDs.length + 1}`;
    const sessionData = { startedAt: new Date() };

    slouchStatistics[getCurrDate()] = {
      ...sessionsToday,
      [newSessionID]: sessionData
    };

    await updateDoc(getUserDocRef(), { slouchStatistics });

    return newSessionID;
  } catch (error) {
    console.error(error);
  }
}

export async function endSession(slouchCount) {
  try {
    const { sessionID, sessionData } = await getOngoingSession();

    const sessionEnd = new Date();
    const sessionStart = sessionData.startedAt.toDate();
    const sessionDuration = (sessionEnd - sessionStart) / 1000; // seconds

    sessionData.endedAt = sessionEnd;
    sessionData.duration = sessionDuration;
    sessionData.slouchCount = slouchCount;

    const userDoc = await getUserDoc();
    const slouchStatistics = userDoc.data().slouchStatistics || {};
    const sessionsToday = slouchStatistics[getCurrDate()] || {};
    sessionsToday[sessionID] = sessionData;
    slouchStatistics[getCurrDate()] = sessionsToday;

    await updateDoc(getUserDocRef(), { slouchStatistics });
  } catch (error) {
    console.error(error);
  }
}

async function getTodaySessions() {
  try {
    const userDoc = await getUserDoc();
    const slouchStatistics = userDoc.data().slouchStatistics || {};
    return slouchStatistics[getCurrDate()] || {};
  } catch (error) {
    console.error(error);
  }
}

// Find the ongoing session (session without endedAt)
async function getOngoingSession() {
  try {
    const userDoc = await getUserDoc();

    let slouchStatistics = userDoc.data().slouchStatistics || {};
    let sessionsToday = slouchStatistics[getCurrDate()] || {};

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
