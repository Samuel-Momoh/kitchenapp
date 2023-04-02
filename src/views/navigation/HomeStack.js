import React, { useContext, useEffect, useState } from 'react';
import { View, ActivityIndicator,Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomNavigator from './BottomNavigator';
import DetailsScreen from '../screens/DetailsScreen';
import UserProfile from '../screens/UserProfile.js';
import TrackOrders from '../screens/trackOrderScreen';
import AddressScreen from '../screens/addressScreen';
import AddAddressScreen from '../screens/addAddressScreen';
import OrderSummary  from '../screens/orderSummaryScreen';
import OrderConfirmation  from '../screens/orderConfirmation';
// import NetInfo from '@react-native-community/netinfo';
import { LOAD_USER,LOAD_ADDR,LOAD_IMG } from '../../../Store/Actions/ProductsActions'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage';
import { AuthenticatedUserContext } from './AuthenticatedUserProvider';
import { useDispatch } from 'react-redux'
const Stack = createStackNavigator();

export default function HomeStack() {
  const dispatch = useDispatch()
    const { user} = useContext(AuthenticatedUserContext);
    const [isLoading, setIsLoading] = useState(true);
    async function onLoad(authenticatedUser) {
           try {
 
          // console.log(authenticatedUser)
      if(authenticatedUser !==null)
          {    
          const userDetails = []
          const userAddress = []
          const users = await firestore().collection('users')
          .where("email", "==", authenticatedUser.email) 
          .get()
          users.docs.map((doc )=> {
            const entity = doc.data()
            entity.id = doc.id
            userDetails.push(entity)
            // console.log(entity)
          });
          dispatch(LOAD_USER(userDetails))
          // console.log(userDetails)
        

          if(userDetails[0].address){
            const users = await firestore().collection('address_book')
            .where("user", "==", authenticatedUser.email) 
            .get()
            users.docs.map((doc )=> {
              const entity = doc.data()
              entity.id = doc.id
              userAddress.push(entity)
              // console.log(entity)

            });
            dispatch(LOAD_ADDR(userAddress))
            // console.log(userAddress)
          }else{
            dispatch(LOAD_ADDR([]))
          }
          if(userDetails[0].pic){
      
            // Get Image
            var img =  await storage().ref(`${authenticatedUser.email}.jpg`).getDownloadURL()
            .then((url) => {
              // console.log(url)
              dispatch(LOAD_IMG(url))
            })
            .catch((e) => {
              dispatch(LOAD_IMG([]))
              // console.log('getting downloadURL of image error => ', e)
            
            });
          
            
            
        }
        }

     
      
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      
    }
    useEffect(() => {
     
       onLoad(user);
       // unsubscribe on unmount
      //  NetInfo.fetch().then(state => {
      //   console.log('Connection type', state.type);
      //   console.log('Is connected?', state.isConnected);
      //   state.isConnected?
      // null
      //   :
      //   Alert.alert(
      //     "Error",
      //     "No internet Connection",
      //     [
      //       { text: "Retry", onPress: () => {
      //       } }
      //     ]
      //   )
      // });
    }, []);
    if (isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size='large' color="#F9813A"/>
        </View>
      );
    }
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}
    >

     <Stack.Screen name="HomePage" component={BottomNavigator} />
      <Stack.Screen name='DetailsScreen' component={DetailsScreen} />
      <Stack.Screen name='UserProfile' component={UserProfile} />
      <Stack.Screen name='TrackOrders' component={TrackOrders} />
      <Stack.Screen name='AddressScreen' component={AddressScreen} />
      <Stack.Screen name='Addaddress' component={AddAddressScreen} />
      <Stack.Screen name='OrderSummary' component={OrderSummary} />
      <Stack.Screen name='OrderConfirmation' component={OrderConfirmation} />
    </Stack.Navigator>
  );
}