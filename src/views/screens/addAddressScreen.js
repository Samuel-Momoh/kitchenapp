import React,{ useEffect, useContext,useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image,Dimensions,} from 'react-native';
import {ScrollView, TouchableOpacity,TextInput,FlatList,} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Entypo } from "@expo/vector-icons";
import COLORS from '../../consts/colors';
import {ActivityButton} from '../components/Button';
import { useDispatch, useSelector } from 'react-redux'
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import firestore from '@react-native-firebase/firestore'
const address = firestore().collection('address_book')
const userStore = firestore().collection('users')
import MapboxGL from '@react-native-mapbox-gl/maps';
import * as Location from 'expo-location';
import axios from "axios";
import Autocomplete from 'react-native-autocomplete-input';
const { height,width} = Dimensions.get('screen');
const detailsHeight = height * (1/3);

MapboxGL.setAccessToken('pk.eyJ1IjoicHNhbG1pdGUiLCJhIjoiY2t2bTE2NnUyMHV6cDJ4b3VjaG5tY2RuOSJ9.rK9V82R3LwZrhhP5URjxbA');
const AddAddressScreen = ({navigation}) => {
  const { user, } = useContext(AuthenticatedUserContext);
  const [errorMsg, setErrorMsg] = useState(null);
  const userAddress = useSelector((state) => state.users.address)
  const userDetails = useSelector((state) => state.users.users)
  const [loading, setloading] = useState(false)
// Autocomplete
  const [geoData, setgeoData] = useState([]);
  const [query, setQuery] = useState('');
  const [Landmark, setLandmark] = useState([]);
  const [bulding, setbulding] = useState('');
  

  // console.log(Landmark)
  const dispatch = useDispatch()
useEffect(() => {
  if(userDetails[0][0].address){
    setLandmark(userAddress[0][0])
    setQuery(userAddress[0][0].formatted)
    setbulding(userAddress[0][0].address)
    //  console.log(Landmark.formatted)
    //  Landmark.formatted ==null? console.log(userAddress[0][0].landmark) : console.log(Landmark.formatted)
   }
  // return () => {
  //   cleanup
  // }
}, [])
 
//  userAddress?.length
  const onAddButtonPress = () => {
    // console.log(Landmark,bulding)
    setloading(true)
    if (Landmark.length !==0 && bulding !== '') {
      // console.log('running')
        const data = {
            user:user.email,
            formatted: Landmark.formatted,
            address: bulding,
            lat: Landmark.lat,
            lon:Landmark.lon
        };
      //   const Updata = {
      //     // landmark:  Landmark.formatted ==null? userAddress[0][0].landmark : Landmark.formatted,
      //     address: bulding,
      //     lat: Landmark.lat,
      //     lon:Landmark.lon
      // };
        userDetails[0][0].address?
        address
          .doc(userAddress[0][0].id)
          .update(data)
            .then(_doc => {
                // setEntityText('')
                // Keyboard.dismiss()
                setloading(false)
                navigation.goBack()
            })
            .catch((error) => {
                alert(error)
                setloading(false)
            })
            :
            address
            .add(data)
            .then(_doc => {
                // setEntityText('')
                // Keyboard.dismiss()
                userStore
                .doc(userDetails[0][0].id)
                .update({
                  address: true,
                })
                  .then(_doc => {

                  })
                  .catch((error) => {
                      alert(error)
                      setloading(false)
                  })
                setloading(false)
                navigation.goBack()
            })
            .catch((error) => {
                alert(error)
                setloading(false)
            });
    }else{
      setloading(false)
    }
 
}
const renderAnnotations = () => {
  return (
    <MapboxGL.PointAnnotation
      key="pointAnnotation"
      id="pointAnnotation"
      coordinate={Landmark.length !==0? [Landmark.lat, Landmark.lon]:[3.3362400, 6.5790100]}>
      <View>
      <View style={{
        		}} >
<Icon name="location-pin" size={34} style={{color:'rgb(249, 129, 58)'}} />
              </View>
        </View>
    </MapboxGL.PointAnnotation>
  );
}
const searchFunc = async(query) =>{
  const options = {
    method: 'GET',
    url: 'https://api.geoapify.com/v1/geocode/autocomplete',
    params: {text: query,apiKey: '0b36eb9c56594effbdb9e3fac70ece9f',format:'json'},
    headers: { }
  };
  if(query !==''){
    await axios.request(options).then(function (response) {
      // console.log(response.data.results);
      setgeoData(response.data.results)
      
  }).catch(function (error) {
      console.error(error);
  });
  }

}
var getLocation = async () =>{
  let { status } = await Location.requestForegroundPermissionsAsync({
    accuracy: Location.Accuracy.Highest
  });
  if (status !== 'granted') {
    setErrorMsg('Permission to access location was denied');
    return;
  }

  let location = await Location.getCurrentPositionAsync({});
    
    const options = {
      method: 'GET',
      url: 'https://api.geoapify.com/v1/geocode/reverse',
      params: {lat: location.coords.latitude,lon:location.coords.longitude, apiKey: '0b36eb9c56594effbdb9e3fac70ece9f',format:'json'},
      headers: { }
    };
    
      await axios.request(options).then(function (response) {
       if(response.data.results?.length){
        setLandmark(response.data.results[0])
        setQuery(response.data.results[0].formatted)
       }
       
    }).catch(function (error) {
        console.error(error);
    });
    
}
  return (
    <SafeAreaView style={{backgroundColor: COLORS.white,height:'100%'}}>
      <View style={style.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Choose Address</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{height: height}}>
        <View style={style.container}>
        <MapboxGL.MapView style={style.map} 
           zoomLevel={4}
           
           centerCoordinate={Landmark.length !==0? [Landmark.lat, Landmark.lon]:[3.3362400, 6.5790100] }
          >
             <MapboxGL.Camera
            zoomLevel={16}
            centerCoordinate={Landmark.length !==0? [Landmark.lat, Landmark.lon]:[3.3362400, 6.5790100]}
            animationMode={'flyTo'}
            animationDuration={0}
          >
          </MapboxGL.Camera>
          {renderAnnotations()}
          </MapboxGL.MapView>
        </View>
      </ScrollView>
      <View style={style.inputBody} >
     
      <View
        style={{
          marginTop: 10,
          paddingHorizontal: 20,
          zIndex:3,
          // height: 50,
        }}
        >

<View style={style.autocompleteContainer}>
      <Icon name="location-pin" size={28} style={style.icon} />
      <Autocomplete
  containerStyle={{
    display:'flex',
    justifyContent:'center'
  }}
  inputContainerStyle={{borderColor:'#fff'}}
  listContainerStyle={{borderColor:'#fff',position:'absolute',top:48,width:'115%',right:0}}
  listStyle={{backgroundColor:'red'}}
  editable={!loading}
  autoCorrect={false}
  data={
    geoData?.length === 1
      ? [] // Close suggestion list in case Geodata title matches query
      : geoData
  }
  value={query}
  onChangeText={(e)=>{
    searchFunc(e)
    setQuery(e)
  }}
  placeholder="Enter Landmark"
  flatListProps={{
    keyboardShouldPersistTaps: 'always',
    keyExtractor: (search) => search.place_id,
    renderItem: ({ item } ) => (
      <TouchableOpacity onPress ={() =>{
       
       setQuery(item.formatted)
       setLandmark(item)
       setgeoData([])

      }
       } style={style.suggestion}>
        <Icon name="location-pin" size={28} style={style.icon} />
        <Text style={style.itemText}>{item.formatted}</Text>
      </TouchableOpacity>
    ),
  }}
/>
      </View>
      </View>
      <View
        style={{
          marginTop: 8,
          flexDirection: 'row',
          paddingHorizontal: 20,
        }}>
        <View style={style.inputContainer}>
          <Icon name="location-pin" size={28} style={style.icon} />
          <TextInput
            style={{flex: 1, fontSize: 18,}}
            placeholder="Floor/Bulding"
            value={bulding}
            onChangeText={(e)=>{
              setbulding(e)
            }}
          />
          
        </View>
      </View>
 
     </View>
      <View style={style.updateBtn}>
          <ActivityButton
           onPress={()=>{
            // navigation.navigate("OrderSummary")
            onAddButtonPress();
         }
        }
             title="Choose Address"
             btnState={loading}
            
             />
        
          </View>
<View style={style.location}>
<TouchableOpacity 
style={style.locationIcon}
onPress={()=>{
  getLocation()
}}

>
<Entypo name="compass" size={28} style={style.icon} />

</TouchableOpacity>
</View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    position: 'relative',
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },

  iconContainer: {
    backgroundColor: COLORS.white,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  inputContainer: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  updateBtn: {
      position:'absolute',
      bottom:10,
      display: 'flex',
      justifyContent:'center',
      left:40,
      width: '80%',
      height: 60,
      borderRadius: 20,
      textAlign: 'center',
  },
  icon: {
    color:' rgb(249, 129, 58)'
  },
  inputBody:{
    position:'absolute',
    top:60,
    width:'100%'
  },
  container: {
    height: height,
    width: width,
  },
  map: {
    flex: 1
  },
  autocompleteContainer: {

    marginTop: 10,
    paddingHorizontal: 20,
    flex: 1,
    flexDirection:'row',
    zIndex: 8,
    padding: 5,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  itemText: {
    fontSize: 15,
    margin: 2,
  },
  suggestion:{
    display:'flex',
    flexDirection:'row',
    borderBottomColor:COLORS.primary,
    borderBottomWidth:.6,
  },
  location:{
    position:'absolute',
    bottom:120,
    right:10,
    zIndex:99
  },
  locationIcon:{
    width:50,
    height:50,
    borderRadius:200,
    borderColor:COLORS.primary,
    borderWidth:2,
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
});

export default AddAddressScreen;
