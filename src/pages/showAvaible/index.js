import React, { useState } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { Button } from "react-native-paper";
import styles from "./styles";

export default function App({ route }) {
  const {
    id,
    name,
    title,
    adress,
    age,
    uriAvatar400X400,
    dataCreate,
    description,
    rating,
  } = route.params;
  return (
    <View>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          style={styles.imageCard}
          source={{
            uri: uriAvatar400X400,
          }}
        />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.rating}>Nota:{rating}</Text>
        <Text style={styles.description}>{description}</Text>

        <Text>Idade do Walker: {age}</Text>
        <Text>Endereço do Walker: {adress}</Text>
        <Text style={styles.description}>Walker desde {dataCreate}</Text>

        <Button
          icon="dog"
          mode="contained"
          style={styles.button}
          onPress={() => alert("Walker Acionado! ")}
        >
          Acionar Walker
        </Button>
      </ScrollView>
    </View>
  );
}

// import React, { useState } from 'react';
// import { View, Text } from 'react-native';
// import styles from './styles';

// export default function App({ route }) {
//     const { id, name, title } = route.params
//     return (
//         <View style={styles.container}>
//             {console.log(route)}
//             <Text>id: {id}</Text>
//             <Text>name: {name}</Text>
//             <Text>title: {title}</Text>
//         </View>
//     );
// };
