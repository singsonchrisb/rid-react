import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { auth, authForAdminUserCreation } from "../firebase/firestore";
import { useEffect } from "react";

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser,setCurrentUser] = useState();
    const [loading,setLoading] = useState(true)

    function login(email,password) {
        return auth.signInWithEmailAndPassword(email,password)
    }

    function signout(){
        return auth.signOut()
    }

    function signupAdminUserCreation(email,password) {
        return authForAdminUserCreation.createUserWithEmailAndPassword(email,password)
    }

    useEffect(()=>{

        const unsubscribe = auth.onAuthStateChanged(user =>{
            setCurrentUser(user)
            setLoading(false)
            // alert('currentUser: ' +user)
        })

        return unsubscribe
    },[])


    const value = {
        currentUser,
        login,
        signout,
        signupAdminUserCreation,
    }

    return(
        <AuthContext.Provider value={value}>
            { !loading && children }
        </AuthContext.Provider>
    )
}