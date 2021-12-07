import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux'
import auth from '@react-native-firebase/auth';
import { AuthenticatedUserContext } from './AuthenticatedUserProvider';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';



const Stack = createStackNavigator();
export default function RootNavigator() {
  const dispatch = useDispatch()
    const { user, setUser } = useContext(AuthenticatedUserContext);
    const [isLoading, setIsLoading] = useState(true);
 
    async function onAuthStateChanged(authenticatedUser) {
           try {
          await (authenticatedUser ? setUser(authenticatedUser) : setUser(null));
          // console.log(authenticatedUser)
    
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      
    }
    useEffect(() => {
     
     auth().onAuthStateChanged(onAuthStateChanged);
      // return subscriber; // unsubscribe on unmount
    }, []);
  
    if (isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size='large' color="#F9813A"/>
        </View>
      );
    }
    return (
      <NavigationContainer>
        {user ? <HomeStack /> : <AuthStack />}
      </NavigationContainer>
    );
  }