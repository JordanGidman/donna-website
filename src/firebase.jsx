import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyAPVSyPgSey1ZyuXpPjBGAzMlk6zZeCoI4",
//   authDomain: "donnag-gallery-site.firebaseapp.com",
//   projectId: "donnag-gallery-site",
//   storageBucket: "donnag-gallery-site.appspot.com",
//   messagingSenderId: "804689870683",
//   appId: "1:804689870683:web:4b8b776169453a38c6a47e",
// };

const firebaseConfig = {
  apiKey: "AIzaSyCS5k9zrK0AY9V7R7jCZfXblhVt75ZEj8E",
  authDomain: "react-client-gallery.firebaseapp.com",
  projectId: "react-client-gallery",
  storageBucket: "react-client-gallery.appspot.com",
  messagingSenderId: "262174164520",
  appId: "1:262174164520:web:0ad62b35a80bae9bd2d71d",
};

// const _PRIVATE = "Yen0CZbngxOD5V0zxIs4tqhrvsF2";

// Initialize Firebase
// export default _PRIVATE;
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
