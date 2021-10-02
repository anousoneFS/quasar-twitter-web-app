import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: 'AIzaSyAU_MbIBB3WO8uI7HVjYTuax-aNwTWyHf8',
  authDomain: 'qwitter-4506e.firebaseapp.com',
  projectId: 'qwitter-4506e',
  storageBucket: 'qwitter-4506e.appspot.com',
  messagingSenderId: '927100263995',
  appId: '1:927100263995:web:fc5b59bc5c84a2ba52c61e'
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

export default db
