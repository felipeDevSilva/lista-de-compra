// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_API_KEY}`,
  authDomain: "lista-de-compra-addde.firebaseapp.com",
  projectId: "lista-de-compra-addde",
  storageBucket: "lista-de-compra-addde.appspot.com",
  messagingSenderId: "565005859188",
  appId: `${import.meta.env.VITE_APP_ID}`,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
