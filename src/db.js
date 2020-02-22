import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCgZgWP30C8O8RFGss0LQqRdAqFrlaE5r8",
  authDomain: "vue-not-selling-programm.firebaseapp.com",
  databaseURL: "https://vue-not-selling-programm.firebaseio.com",
  projectId: "vue-not-selling-programm",
  storageBucket: "vue-not-selling-programm.appspot.com",
  messagingSenderId: "2757212586",
  appId: "1:2757212586:web:05a857163e45ac7b19d3d3"
};

// Get a Firestore instance
export const db = firebase
  .initializeApp(firebaseConfig)
  .firestore()
