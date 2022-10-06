import * as React from 'react';
import { Alert } from "react-native";
import { Text, View, Button } from 'react-native';
import styles from "./style";
import firebase from '../../services/firebase';

const ScreenContainer = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

export default function App({navigation}) {

  function logOut(){
   
    firebase.auth().signOut()
    .then(() => {
        Alert.alert("Sistema", "Deslogando...")
    })
    .catch((error) => {
        console.log(error.message)
    });

  }
 
    return (
      <ScreenContainer>
      <Text>Em construção...</Text>
      
      <Button title="Sign Out"  onPress={() => logOut() } />
  
    </ScreenContainer>
      );
  }