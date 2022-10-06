import { StyleSheet, StatusBar } from 'react-native'


export default StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
    
  },
  item: {
    backgroundColor: '#e6e6e6',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderColor:'#cccccc',
    borderWidth:2,
    borderRadius:5,
  },
  title: {
    fontSize: 32,
  },
  imageCard:{
    height:64,
    width:64,
    borderRadius:50,
    alignSelf:'center',
    marginRight:5
  },
  mainCard:{
    flexDirection:'row',
    // backgroundColor:'red'
  },
  nameMainCard:{
    fontSize:22
  },
  ratingMainCard:{
    fontSize:16,
    marginTop:5
  },
  cardDescription:{   
    
    marginLeft: 6,
    alignSelf:'center'
  },
  mainCardView:{
    marginTop:15

  },

})    