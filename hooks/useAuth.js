import * as Google from "expo-google-app-auth";
import React, { createContext, useContext } from 'react'
const AuthContext = createContext({});

const config ={
    // clientId:process.env.CLIENT_ID,
    androidClientId:process.env.GOOGLE_CLIENT_ID,
    iosClientId:process.env.IOS_CLIENT_ID,
    scopes: ["profile", "email"],
    permissions: ["public_profile", "email", "gender", "location"],
}

export const AuthProvider = ({children}) => {
    const signInWithGoogle = async () => {
        Google.logInAsync(config).then(async (logInResult) => {
            if (logInResult.type === 'success') {

            }
        });
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