import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCL24lA4rtK0EgMUed3dY7tDEJSHVTIEkk",
  authDomain: "amzn-2-322708.firebaseapp.com",
  projectId: "amzn-2-322708",
  storageBucket: "amzn-2-322708.appspot.com",
  messagingSenderId: "713719827227",
  appId: "1:713719827227:web:c9593c09d083eb57c9e1be"
};

const app = !firebase.apps.length 
? firebase.initializeApp(firebaseConfig) 
: firebase.app();

const db = app.firestore();

export default db;