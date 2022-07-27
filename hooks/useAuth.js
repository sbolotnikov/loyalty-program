import { createContext, useContext, useState, useEffect } from 'react';
import { auth, db, app } from '../firebase';
import firebase from 'firebase/compat/app';
const AuthContext = createContext({});
import { doc, setDoc, getDoc, Timestamp } from "firebase/firestore";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged,sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider } from "firebase/auth"; 
import { Platform } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';


export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);

  const [accessToken, setAccessToken] = useState();
  // const [message, setMessage] = useState();
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:process.env.REACT_APP_GOOGLE_CLIENT_ID,
    androidClientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    iosClientId:process.env.REACT_APP_IOS_CLIENT_ID,
    webClientId:process.env.REACT_APP_CLIENT_ID,
    scopes: ['profile', 'email'],
    // permissions: ["public_profile", "email", "gender", "location"],
  });
  WebBrowser.maybeCompleteAuthSession();
  useEffect(() => {
    if (response?.type === 'success') {
      console.log( response);
      setCurrentUser(response.user)
      }
  }, [response]);

  const signup = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth,email, password);
    } catch (err) {
      console.log(err);
    }
    return;
    // auth.createUserWithEmailAndPassword(email, password);
  };
  function login(email, password) {
    console.log('in login');
    return signInWithEmailAndPassword(auth, email, password);
  }
  const signInWithGoogle = async () => {
    console.log('in google signin');

    const provider = new GoogleAuthProvider();
    if (Platform.OS!=='web') {
      promptAsync({useProxy: false, showInRecents: true})

    } else signInWithPopup(auth,provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access Google APIs.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      // const user = result.user;
  
      // The signed-in user info.
      setCurrentUser(result.user)
      console.log(result);
    }).catch((error) => {
      // Handle Errors here.
      console.log("error after:",error.message)
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      // const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });

    // const googleProvider = new firebase.auth.GoogleAuthProvider();
    // auth
    //   .signInWithPopup(googleProvider)
    //   .then((res) => {
    //     console.log(res.user);
    //     db.collection('users').doc(res.user.multiFactor.user.uid).set(
    //       {
    //         status: 'student',
    //       },
    //       { merge: true }
    //     );
    //     let newUser = currentUser;
    //     newUser.status = 'student';
    //     setCurrentUser(newUser);
    //   })
    //   .catch((error) => {
    //     console.log(error.message);
    //   });

    // promptAsync({useProxy: false, showInRecents: true})
  };
  async function  logout() {
    console.log('logging out');
    return await signOut(auth);
  }

  async function resetPassword(email) {
    return await sendPasswordResetEmail(auth, email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  function updateUser(name, url) {
    console.log('setting profile ' + name + url);
    console.log(currentUser);
    return currentUser
      .updateProfile({
        displayName: name,
        photoURL: url,
      })
      .then(function () {
        // Update successful.
      })
      .catch(function (error) {
        console.log('error on Profile update'); // An error happened.
      });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log(user);
      if (user) {

        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log('Document data:', docSnap.data().status);
          let userChange={...user, status:docSnap.data().status}
          setCurrentUser(userChange);
          setDoc(docRef,            
          {
            lastSeen: Timestamp.now(),
          },
          { merge: true });

          // db.collection('users').doc(user.uid).set(
          //   {
          //     email: user.multiFactor.user.email,
          //   photoURL: user.multiFactor.user.photoURL,
          //   displayName: user.multiFactor.user.displayName,
          //     lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
          //   },
          //   { merge: true }
          // );
          // user.multiFactor.user.status = docSnap.data().status;

        } else {
          setDoc(docRef,            
            {
              email: user.email,
              photoURL: user.photoURL,
              displayName: user.displayName,
              status:"student",
              lastSeen: Timestamp.now(),
            },
            { merge: true });
          // db.collection('users').doc(user.multiFactor.user.uid).set(
          //   {
          //     email: user.multiFactor.user.email,
          //     photoURL: user.multiFactor.user.photoURL,
          //     displayName: user.multiFactor.user.displayName,
          //     status:"student",
          //     lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
          //   },
          //   { merge: true }
          // );
          user.status = "student";
          setCurrentUser(user);
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      } else setCurrentUser({});

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    updateUser,
    signInWithGoogle,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
