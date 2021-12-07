import React,{useEffect,useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text,Dimensions,Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import {SecondaryButton} from '../components/Button';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { useSelector } from 'react-redux'


const {width, height} = Dimensions.get('screen');
const detailsHeight = height * (1/3);
const surfHeight= height - detailsHeight - 110

MapboxGL.setAccessToken('pk.eyJ1IjoicHNhbG1pdGUiLCJhIjoiY2t2bTE2NnUyMHV6cDJ4b3VjaG5tY2RuOSJ9.rK9V82R3LwZrhhP5URjxbA');
const AddressScreen = ({navigation}) => {
const userAddress = useSelector((state) => state.users.address)
const userDetails = useSelector((state) => state.users.users)
const [address, setaddress] = useState([])
  useEffect(() => {
    if(userDetails[0][0].address){
      setaddress(userAddress[0][0])
      // console.log(userAddress[0][0])
     }

  }, [])
  // console.log(address)
  const renderAnnotations = () => {
    return (
      <MapboxGL.PointAnnotation
        key="pointAnnotation"
        id="pointAnnotation"
        coordinate={address.length !==0? [address.lat, address.lon]:[3.3362400, 6.5790100]}>
        <View style={{
        		}} >
<Icon name="location-pin" size={34} style={{color:'rgb(249, 129, 58)'}} />
              </View>
      </MapboxGL.PointAnnotation>
    );
  }
  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <View style={style.header}>
        <Icon name="arrow-back-ios" size={28}  onPress={navigation.goBack} />
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Address</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: surfHeight,
          }}>
            <View style={style.page}>
        <View style={style.container}>
          <MapboxGL.MapView style={style.map} 
           zoomLevel={4}
           centerCoordinate={address.length !==0? [address.lat, address.lon]:[3.3362400, 6.5790100]}
          >
             <MapboxGL.Camera
            zoomLevel={16}
            centerCoordinate={address.length !==0? [address.lat, address.lon]:[3.3362400, 6.5790100]}
            animationMode={'flyTo'}
            animationDuration={0}
          >
          </MapboxGL.Camera>
          {renderAnnotations()}
          </MapboxGL.MapView>
        </View>
      </View>
        </View>
         <View style={style.details}>
         <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{fontSize: 25, fontWeight: 'bold', color: COLORS.white}}>
            Delivery to 
            </Text>
          </View>
          
          <Text style={style.detailsText}>
          {address.length !==0? `${address.address} ${address.formatted}`:null}
          </Text>
          
 

          <View style={style.addToCart}>
            
          <SecondaryButton
             title="Edit"
             onPress={()=>{
             navigation.navigate("Addaddress")
             }
            }
             />
       
          </View>
        </View> 
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  details: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 60,
    backgroundColor: COLORS.primary,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    minHeight:detailsHeight,
  },
  iconContainer: {
    backgroundColor: COLORS.white,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  detailsText: {
    marginTop: 10,
    lineHeight: 22,
    fontSize: 16,
    color: COLORS.white,
  },
  addToCart:{
    marginLeft: 40,
    marginBottom:5,
    display: 'flex',
    justifyContent:'center',
    position:'absolute',
    bottom: 25,
    width: '100%',
    height: 60,
    borderRadius: 20,
    textAlign: 'center',
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: 360,
    width: width,
    backgroundColor: 'tomato'
  },
  map: {
    flex: 1
  }
});

export default AddressScreen;
