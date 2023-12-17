// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDtZs6HskvfzKwHhh8N0wPTizEa7Qo-Aok",
  authDomain: "showyourbuilds.firebaseapp.com",
  projectId: "showyourbuilds",
  storageBucket: "showyourbuilds.appspot.com",
  messagingSenderId: "491502826859",
  appId: "1:491502826859:web:bd884d07021cdef1ad082e",
  measurementId: "G-WMRJB21DJQ",
  storageBucket: "gs://showyourbuilds.appspot.com"
  
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };