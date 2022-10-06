import React, { useEffect, useState, Fragment } from 'react';
import { SafeAreaView, View, FlatList, Text, TouchableOpacity, Image, ActivityIndicator, ScrollView,  } from 'react-native';
import ImagedCardView from "react-native-imaged-card-view";
import styles from './styles';
import firebase from '../../services/firebase';

//refatoraçao
const Item = ({ item, navigation }) => (
    <View style={styles.mainCardView}>
    <TouchableOpacity onPress={() => { navigation.navigate("showAvaible", item) }} style={styles.item}>
        <View style={styles.mainCard}>
            <Image
                style={styles.imageCard}
                source={{
                    uri: item.uriAvatar,
                }}
            />
            
            <View style={styles.cardDescription}>
                <Text style={styles.nameMainCard}>{item.name}</Text>
               
                <Text style={styles.ratingMainCard}>Nota: {item.rating}</Text>
                <Text style={styles.ratingMainCard}>Idade: {item.age}</Text>
              
               
            </View>
        </View>

    </TouchableOpacity>
    </View>
);

export default function App({ navigation }) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        readAllAvailableWalkers()
    }, [])

  


    function readAllAvailableWalkers() {
        firebase.database().ref("availableWalkers").on('value', (snapshot) => {
            setData([])
            snapshot.forEach((chilItem) => {
                let data2 = {
                    key: chilItem.key,
                    title: chilItem.val().title,
                    name: chilItem.val().name,
                    dataCreate: chilItem.val().dataCreate,
                    uriAvatar: chilItem.val().uriAvatar,
                    uriAvatar400X400: chilItem.val().uriAvatar400X400,
                    adress: chilItem.val().adress,
                    age: chilItem.val().age,
                    rating: chilItem.val().rating,
                    description: chilItem.val().description

                };
                // console.log(data);
                setData(oldArray => [...oldArray, data2])
            })
            setLoading(false)
        })
    }

    const renderItem = ({ item }) => (
        <Item navigation={navigation} item={item} />
    );

    return (
        <SafeAreaView style={styles.container}>
            {loading ?
                <ActivityIndicator size="small" color="#0000ff" />
                :
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.key}
                />
            }
          
        </SafeAreaView>
    );
}











// import React from 'react';
// import { SafeAreaView, View, FlatList, Text, TouchableOpacity } from 'react-native';
// import styles from './styles';

// //refatoraçao
// const Item = ({ item, navigation }) => (
//     <TouchableOpacity onPress={() => { navigation.navigate("AvailableWalkers" , item ) }} style={styles.item}>
//         <Text style={styles.title}>{item.title}</Text>
//     </TouchableOpacity>
// );

// export default function App({ navigation }) {

//     function readAllAvailableWalkers(){
//         //ligar ao firebase
//     }

//     const renderItem = ({ item }) => (
//         <Item navigation={navigation} item={item} />
//     );

//     return (
//         <SafeAreaView style={styles.container}>
//             <FlatList
//                 data={DATA}
//                 renderItem={renderItem}
//                 keyExtractor={item => item.id}
//             />
//         </SafeAreaView>
//     );
// }




// const DATA = [
//     {
//         id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//         title: 'First Item',
//         name:'alan cara do dog',
//         dataCreate:'',
//         uriAvatar:'',
//         uriAvatar400X400:'',
//         adress:'',
//         age:'',
//         rating:'',       
//     },
//     {
//         id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//         title: 'Second Item',
//         dataCreate:'',
//         uriAvatar:'',
//         uriAvatar400X400:'',
//         adress:'',
//         age:'',
//         rating:'',  
//     },
//     {
//         id: '58694a0f-3da1-471f-bd96-145571e29d72',
//         title: 'Third Item',
//         dataCreate:'',
//         uriAvatar:'',
//         uriAvatar400X400:'',
//         adress:'',
//         age:'',
//         rating:'',  
//     },
// ];