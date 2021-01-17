import firebase from "firebase/app"
import "firebase/firestore"

const config = {
    apiKey: "AIzaSyDyAAs9BDDRWQqkwPHi5Z2pue_Zo4HgbkU",
    authDomain: "idea-htne.firebaseapp.com",
    projectId: "idea-htne",
    storageBucket: "idea-htne.appspot.com",
    messagingSenderId: "45654341750",
    appId: "1:45654341750:web:7fb2d1e65d82c3e8d18757",
    measurementId: "G-E500D57BD9"
  };

firebase.initializeApp(config)

export const firestore = firebase.firestore()
export default firebase;