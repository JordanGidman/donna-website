import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAPVSyPgSey1ZyuXpPjBGAzMlk6zZeCoI4",
  authDomain: "donnag-gallery-site.firebaseapp.com",
  projectId: "donnag-gallery-site",
  storageBucket: "donnag-gallery-site.appspot.com",
  messagingSenderId: "804689870683",
  appId: "1:804689870683:web:4b8b776169453a38c6a47e",
};

// const _PRIVATE = "Yen0CZbngxOD5V0zxIs4tqhrvsF2";

// Initialize Firebase
// export default _PRIVATE;
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
