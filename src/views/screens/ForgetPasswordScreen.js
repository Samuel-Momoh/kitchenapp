import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Button as RNButton,Image,Alert } from 'react-native';
import {ActivityButton} from '../components/Button';
import { InputField, ErrorMessage } from '../components';
import auth from '@react-native-firebase/auth';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function ForgetPasswordScreen({ navigation }) {

  const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [passwordVisibility, setPasswordVisibility] = useState(true);
//   const [rightIcon, setRightIcon] = useState('eye');
  const [loginError, setLoginError] = useState('');
  const [loading, setloading] = useState(false)
//   const handlePasswordVisibility = () => {
//     if (rightIcon === 'eye') {
//       setRightIcon('eye-off');
//       setPasswordVisibility(!passwordVisibility);
//     } else if (rightIcon === 'eye-off') {
//       setRightIcon('eye');
//       setPasswordVisibility(!passwordVisibility);
//     }
//   };

  const  forgotPassword = async () => {
    setloading(true)
    try {
      if (email !== '') {
        await auth().sendPasswordResetEmail(email)
        .then(function (user) {
          Alert.alert(
            "Successful",
            "Please check your email...",
            [
              { text: "OK", onPress: () => {
                setloading(false)
              } }
            ]
          );
          }).catch(function (e) {
            const msg = e.message.substr(e.message.indexOf(' ')+1);;
            Alert.alert(
              "Error",
              msg,
              [
                { text: "OK", onPress: () => {
                  setloading(false)
                } }
              ]
            );
          })
      }else{
        Alert.alert(
          "Error",
          "One Or More is Empty",
          [
            { text: "OK", onPress: () => {
              setloading(false)
            } }
          ]
        );
      }
    } catch (error) {

      setloading(false)
    }
  };

  return (
    <View style={styles.container}>
   <StatusBar style='dark-content' />
   <Image source={require('../../assets/logo.jpg')} style={styles.logo} />
   
   <View style={styles.content}>
   <Text style={styles.title}>Password Recovery</Text>
   <InputField
       inputStyle={{
          fontSize: 14
        }}
        containerStyle={{
          backgroundColor: '#fff',
          marginBottom: 20
        }}
        leftIcon='email'
        placeholder='Enter email'
        autoCapitalize='none'
        keyboardType='email-address'
        textContentType='emailAddress'
        autoFocus={true}
        value={email}
        onChangeText={text => setEmail(text)}
  />

     {loginError ? <ErrorMessage error={loginError} visible={true} /> : null}
        <ActivityButton
          onPress={forgotPassword}
          btnState={loading}
          title="RESET"
        />
     
        <View style={styles.Buttom}>
        <TouchableOpacity
        >
        <Text style={{color:'#fff'}}>
          Dont Have An Account?
        </Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={()=>{
          navigation.navigate("Signup")
        }}
        >
        <Text style={{color:'#fff'}}>
        Signup
        </Text>
        </TouchableOpacity>
        </View>
        </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e93b81',
    paddingTop: 80,
    paddingHorizontal: 12
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    alignSelf: 'center',
    paddingBottom: 24
  },
  content: {
 
  },
  Buttom:{
    marginTop:10,
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
  },
  logo:{
    height: 100,
     width: 100,
     borderRadius:50,
     display:'flex',
     alignSelf:'center'
      }
});