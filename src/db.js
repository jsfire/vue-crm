import * as firebase from 'firebase';
import 'firebase/firestore';


// Get a Firestore instance
export const db = firebase
  .initializeApp({ projectId: "vue-not-selling-programm" })
  .firestore()
