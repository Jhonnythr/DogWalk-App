import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firebase-auth';
import "firebase/firestore"
import 'firebase/storage'

var firebaseConfig = {
  apiKey: "AIzaSyCI3_ycipkMSs4WkDrmWtntc5etqWwqzW0", authDomain: "pet-teste-jhonny.firebaseapp.com", projectId: "pet-teste-jhonny", storageBucket: "pet-teste-jhonny.appspot.com", messagingSenderId: "891582021157", appId: "1:891582021157:web:3d68005d62d745f95349cc", measurementId: "G-SYF600T8DJ"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;