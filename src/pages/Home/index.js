import * as React from "react";
import { Text, View } from "react-native";
import styles from "./style";
import AvaibleWalkers from '../../components/avaibleWalkers'

import Menu from '../Welcome'

// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>testtteeee!</Text>
//     </View>
//   );
// }

export default function App({navigation}) {
  return (
      <View style={styles.container}>
        <AvaibleWalkers navigation={navigation}/>
      </View>
  );
};