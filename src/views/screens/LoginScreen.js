import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Button as RNButton,Image,Dimensions, Alert } from 'react-native';
import {ActivityButton} from '../components/Button';
import { InputField, ErrorMessage } from '../components';
import auth from '@react-native-firebase/auth';
import { TouchableOpacity } from 'react-native-gesture-handler';


const {width, height} = Dimensions.get('screen')
export default function LoginScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [loginError, setLoginError] = useState('');
const [loading, setloading] = useState(false)
  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const onLogin = async () => {
    setloading(true)
    try {
      if (email !== '' && password !== '') {
        await auth().signInWithEmailAndPassword(email, password)
        .then(()=>{
          setloading(false)
        })
        ;
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
      const msg = error.message.substr(error.message.indexOf(' ')+1);;
      Alert.alert(
        "Error",
        msg,
        [
          { text: "OK", onPress: () => {
            setloading(false)
          } }
        ]
      );
      setloading(false)
    }
  };

  return (
    
    <View style={styles.container}>
   <StatusBar style='dark-content' />
   <Image source={require('../../assets/logo.jpg')} style={styles.logo} />
   <View style={styles.content}>
   <Text style={styles.title}>LOGIN</Text>
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
  <InputField
       inputStyle={{
          fontSize: 14
        }}
        containerStyle={{
          backgroundColor: '#fff',
          marginBottom: 20
        }}
        leftIcon='lock'
        placeholder='Enter password'
        autoCapitalize='none'
        autoCorrect={false}
        secureTextEntry={passwordVisibility}
        textContentType='password'
        rightIcon={rightIcon}
        value={password}
        onChangeText={text => setPassword(text)}
        handlePasswordVisibility={handlePasswordVisibility}
  />
     {loginError ? <ErrorMessage error={loginError} visible={true} /> : null}
        <ActivityButton
          onPress={onLogin}
          btnState={loading}
          title="LOGIN"
          
        />
     
        <View style={styles.Buttom}>
        <TouchableOpacity
        onPress={()=>{
          navigation.navigate("forget")
        }}
        >
        <Text style={{color:'#fff'}}>
          Forget Password
        </Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={()=>{
          navigation.navigate("Signup")
        }}
        >
        <Text style={{color:'#fff'}}>
         Create Account
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
    paddingTop: 50,
    paddingHorizontal: 12,
    height:height

    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    alignSelf: 'center',
    paddingBottom: 24
  },
  content: {
    // height:height
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