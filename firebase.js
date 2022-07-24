// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/messaging';
// import 'firebase/compat/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey:process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain:process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId:process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket:process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId:process.env.REACT_APP_FIREBASE_APPID,
  measurementId:process.env.REACT_APP_FIREBASE_MEASUREMENTID,
  // clientId:process.env.REACT_APP_CLIENT_ID,
  // androidClientId:process.env.REACT_APP_GOOGLE_CLIENT_ID,
  // iosClientId:process.env.REACT_APP_IOS_CLIENT_ID,
  // scopes: ["profile", "email"],
  // permissions: ["public_profile", "email", "gender", "location"],
};
// const app = !firebase.apps.length
//   ? firebase.initializeApp(firebaseConfig)
//   : firebase.app();
// const db = app.firestore(app);
// const auth = app.auth(app);
const app = initializeApp(firebaseConfig)
const db = getFirestore(app);
const auth = getAuth(app);
export { db, auth, app };
