import { Alert } from "react-native";
import firebase from "./firebase";
import {userUid} from '../routes/index'
import {AuthContext} from "../routes/context"

export function signUpFirebase(values){
    firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
    .then((userCredential) => {
        var user = userCredential.user;
        values.uriAvatar400x400 = values.uriAvatar;
        createUserInRealtimeDataBase(values, user.uid)
        alert("Successfully created account")
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage)
    });
}

function createUserInRealtimeDataBase(values , uid){
    let res = firebase.database().ref(`profilePets/${uid}`)
    res.set(values) 
}

export function writeUserData(values) {
    firebase.database().ref('profilePets/' + userUid).set({
      username: values.petName,
      profile_picture : values.uriAvatar,
      address: values.address,
      petAge: values.petAge
      
    });
    alert("Successfully created account")
  }

  


// import firebase from '../services/firebase'

// export function signInFirebase(email, password) {
//     firebase.auth().signInWithEmailAndPassword(email, password)
//         .then((userCredential) => {
//             // Signed in
//             var user = userCredential.user;
//             alert("Logado")
//             // ...
//         })
//         .catch((error) => {
//             var errorCode = error.code;
//             var errorMessage = error.message;
//             alert(errorCode);
//         });
// }

// export function deslogar() {
//     firebase.auth().signOut().then(() => {
//         // Sign-out successful.
//       }).catch((error) => {
//         // An error happened.
//       })
// }


// export function signInFirebase(email, password) {
//     firebase.auth().createUserWithEmailAndPassword(email, password)
//     .then((userCredential) => {
//         // Signed in
//         var user = userCredential.user;
//         // ...
//     })
//     .catch((error) => {
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         // ..
//     });
// }


// export function createAccount() {
//     firebase.auth().sendPasswordResetEmail(email)
//     .then(() => {
//       // Password reset email sent!
//       // ..
//       alert("Enviado")
//     })
//     .catch((error) => {
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       alert(errorCode)
//       // ..
//     });
// }
