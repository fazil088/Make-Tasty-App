import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import 'firebase/compat/database'

const firebaseConfig = {
    apiKey: "AIzaSyDWtgGjBPgSKm0qWbo6WEF96ZGgVtDCxSQ",
    authDomain: "make-tasty.firebaseapp.com",
    projectId: "make-tasty",
    storageBucket: "make-tasty.appspot.com",
    messagingSenderId: "493037319332",
    appId: "1:493037319332:web:55f00a60582ca04026a231",
    measurementId: "G-SK83GVSEVZ"
  };

  export default firebase.initializeApp(firebaseConfig)