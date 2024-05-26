import { useEffect, useState } from "react";
import { auth } from "./init";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

export const login = async (navigate) =>{
    const userCredentials = await signInWithPopup(auth, googleProvider);
    if(userCredentials.user) navigate("/");
}

export const logout = async () => {
    signOut(auth);
}

export const useUser = () => {

    const [user, setUser] = useState(auth?.currentUser);

    useEffect(() => {
        auth.onAuthStateChanged( u => setUser(u));
    }, [])

    return user;
}

export const registerWithEmailPassword = async (email, password, navigate) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('User registered:', userCredential.user);
        navigate("/");
    } catch (error) {
        console.error('Registration error:', error.message);
        alert('Registration failed: ' + error.message);
    }
};

export const loginWithEmailPassword = async (email, password, navigate) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('User logged in:', userCredential.user);
        navigate("/");
    } catch (error) {
        console.error('Login error:', error.message);
        alert('Login failed: ' + error.message);
    }
};
