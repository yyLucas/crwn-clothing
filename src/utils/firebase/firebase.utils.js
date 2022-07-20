import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
} from "firebase/auth";

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyABGoz4TYslub1GB-zhvbMzM2rZVNw2S5Q",
    authDomain: "crwn-clothing-db-ee34a.firebaseapp.com",
    projectId: "crwn-clothing-db-ee34a",
    storageBucket: "crwn-clothing-db-ee34a.appspot.com",
    messagingSenderId: "94428321576",
    appId: "1:94428321576:web:398702d6dfe15c9044221d"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createAt,
            })
        } catch (error) {
            console.log("error creating the user", error.message);
        }
    }
    return userDocRef;
}