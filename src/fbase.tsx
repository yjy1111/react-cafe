import { initializeApp, } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// import "firebase/auth"; 
// import  firebase   from 'firebase/app'; 
import "firebase/firestore"; 
import {getFirestore} from "firebase/firestore"; 

const firebaseConfig = {
    apiKey: "AIzaSyCX16LKLSvJt0klasd5Fjxr2VisIJn6ILw",
    authDomain: "react-cafe-d170e.firebaseapp.com",
    projectId: "react-cafe-d170e",
    storageBucket: "react-cafe-d170e.appspot.com",
    messagingSenderId: "825909117881",
    appId: "1:825909117881:web:22b6b962c70f3315146c68",
    measurementId: "G-JFSPC9W7RG"
};

const app=initializeApp(firebaseConfig);
export const authService = getAuth();

// export const firebaseInsance=firebase;
// export const dbService = firebase.firestore();
export const dbService = getFirestore(app);

