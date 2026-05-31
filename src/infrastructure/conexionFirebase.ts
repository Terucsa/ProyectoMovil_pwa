import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB7_kmSkLiNciil4LavarDRDpwN8ZO21pc",
    authDomain: "proyecto-movil-belter.firebaseapp.com",
    projectId: "proyecto-movil-belter",
    storageBucket: "proyecto-movil-belter.firebasestorage.app",
    messagingSenderId: "455005166566",
    appId: "1:455005166566:web:2e4ad7f7264ef8181e9427",
    measurementId: "G-VB1Q6T6X8F"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);