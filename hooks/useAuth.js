// import * as Google from "expo-google-app-auth";
import * as WebBrowser from 'expo-web-browser';
import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import React, { createContext, useContext } from 'react'
const AuthContext = createContext({});

const config ={
    clientId:process.env.CLIENT_ID,
    androidClientId:process.env.GOOGLE_CLIENT_ID,
    iosClientId:process.env.IOS_CLIENT_ID,
    scopes: ["profile", "email"],
    permissions: ["public_profile", "email", "gender", "location"],
}
// Initialize Firebase
initializeApp(config);

WebBrowser.maybeCompleteAuthSession();


  // const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
  //   {
  //     clientId: 'Your-Web-Client-ID.apps.googleusercontent.com',
  //     },
  // );

  // React.useEffect(() => {
  //   if (response?.type === 'success') {
  //     const { id_token } = response.params;
      
  //     const auth = getAuth();
  //     const provider = new GoogleAuthProvider();
  //     const credential = provider.credential(id_token);
  //     signInWithCredential(auth, credential);
  //   }
  // }, [response]);

export const AuthProvider = ({children}) => {
    const signInWithGoogle = async () => {
        // Google.logInAsync(config).then(async (logInResult) => {
        //     if (logInResult.type === 'success') {

        //     }
        // });
    }
  return (
    <AuthContext.Provider value={{user: null, signInWithGoogle}}>
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuth(){
    return useContext(AuthContext)
}