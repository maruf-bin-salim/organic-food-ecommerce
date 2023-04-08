// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAJwdCvQEMrUZQSzL7nbUCBsbPICZv1Cbg",
    authDomain: "organic-food-ecommerce.firebaseapp.com",
    projectId: "organic-food-ecommerce",
    storageBucket: "organic-food-ecommerce.appspot.com",
    messagingSenderId: "454140506001",
    appId: "1:454140506001:web:de51cd2c403fc35521f430",
    measurementId: "G-X1SDKJ8XW7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export { app }