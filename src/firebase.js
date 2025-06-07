import { initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
 //import { EmailAuthProvider } from "firebase/auth/web-extension";
// import { getFirestore } from "firebase/firestore/lite";
import {
    addDoc,
    collection,
    getFirestore
} from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
    apiKey: "AIzaSyCcOQpI3jEYwmR55XV1DrmVKdMDmvPvUNc",
    authDomain: "neflix-clone-db76d.firebaseapp.com",
    projectId: "neflix-clone-db76d",
    storageBucket: "neflix-clone-db76d.firebasestorage.app",
    messagingSenderId: "414734440945",
    appId: "1:414734440945:web:31cc6f8b64d7e6a4980c50"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, 'user'), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code);
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code);
    }
}

const logout = () => {
    signOut(auth);
}

export { auth, db, login, signup, logout };