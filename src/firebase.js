import firebase from 'firebase/compat/app'; 
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';


const firebaseConfig = {
  apiKey: "AIzaSyC2ur5yXIUsyj8WS3mn1V_My9BlTwBjQzM",
  authDomain: "instagram-clone-wj.firebaseapp.com",
  projectId: "instagram-clone-wj",
  storageBucket: "instagram-clone-wj.appspot.com",
  messagingSenderId: "154670255819",
  appId: "1:154670255819:web:70695675c93c93ad43954e",
  measurementId: "G-CNL4TYT9H1"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  
  export { db, auth, storage };


