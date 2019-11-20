import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyB_kIgwerQzHeeXKt0P_XepMmqISA3XEZA",
  authDomain: "crown-db-7569b.firebaseapp.com",
  databaseURL: "https://crown-db-7569b.firebaseio.com",
  projectId: "crown-db-7569b",
  storageBucket: "crown-db-7569b.appspot.com",
  messagingSenderId: "664179507379",
  appId: "1:664179507379:web:b8ee2d0a7d5569de"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
