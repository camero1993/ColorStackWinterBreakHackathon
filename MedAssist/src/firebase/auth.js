import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase.js";

function createUser(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('created', user);
            return userCredential;
        })
        .catch((error) => {
            console.error('error signing up', error);
            return null;
        });
}

function signInUser(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('signed in', user);
            return userCredential;
        })
        .catch((error) => {
            console.error('error signing up', error);
            return null;
        });
}

export { createUser, signInUser };