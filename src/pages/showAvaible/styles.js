import { StyleSheet, StatusBar } from 'react-native'

export default StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
    alignItems: 'center',
    marginHorizontal:12
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  title: {
    fontSize: 28,
  },
  imageCard: {
    height: 200,
    width: 200,
    resizeMode:'cover' ,
    marginVertical:16 
  },
  name:{
    fontSize: 32,    
  },
  rating:{
    fontSize: 28,
    marginVertical:8
  },
  description:{
    marginVertical:16
  },
  button:{
    backgroundColor:'#4d4d4d'
  }
})    