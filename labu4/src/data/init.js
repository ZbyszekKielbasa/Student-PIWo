import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBHaCpFamNUhFIlsPsgvDe_PhPksTYQWp8",
    authDomain: "adammalysz-f7853.firebaseapp.com",
    projectId: "adammalysz-f7853",
    storageBucket: "adammalysz-f7853.appspot.com",
    messagingSenderId: "986129510176",
    appId: "1:986129510176:web:8973e67b399d7012a83145"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
