// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyAwE7DY8R872P8EKO0UGVeJzWRg4lhTbBk",
    authDomain: "expense-tracker-37738.firebaseapp.com",
    projectId: "expense-tracker-37738",
    storageBucket: "expense-tracker-37738.appspot.com",
    messagingSenderId: "722605435242",
    appId: "1:722605435242:web:f1c9c2daa0a48effc91d13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
    app,
    db
}