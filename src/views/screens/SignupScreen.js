import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Button as RNButton,Image } from 'react-native';
import {ActivityButton} from '../components/Button';
import { InputField, ErrorMessage } from '../components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'

const user = firestore().collection('users')
export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [num, setnum] = useState('');
  const [name, setname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [signupError, setSignupError] = useState('');
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

  const onHandleSignup = async () => {
    setloading(true)
    try {
      if (email !== '' && password !== '') {
        await auth().createUserWithEmailAndPassword(email, password)
        // await auth().user.sendEmailVerification()
        .then(()=>{
          const data = {
                        name: name,
                        email: email,
                        phone: num,
                        address: false,
                        pic: false
                    }
                  user
            .add(data)
            .then(_doc => {
              setloading(false)
              // console.log("successful")
            })
            .catch((error) => {
              setloading(false)
               console.log(error)
            });
        })
        ;
      }
    } catch (error) {
      setSignupError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style='dark-content' />
      <Image source={require('../../assets/logo.jpg')} style={styles.logo} />
      <View style={styles.content}>
      <Text style={styles.title}>Create new account</Text>
      <InputField
        inputStyle={{
          fontSize: 14
        }}
        containerStyle={{
          backgroundColor: '#fff',
          marginBottom: 20
        }}
        leftIcon='email'
        placeholder='Enter Fullname'
        autoCapitalize='none'
        keyboardType='default'
        textContentType='name'
        autoFocus={true}
        value={name}
        onChangeText={text => setname(text)}
      />
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
            <InputField
        inputStyle={{
          fontSize: 14
        }}
        containerStyle={{
          backgroundColor: '#fff',
          marginBottom: 20
        }}
        leftIcon='phone'
        placeholder='Enter number'
        autoCapitalize='none'
        keyboardType='default'
        textContentType='telephoneNumber'
        autoFocus={true}
        value={num}
        onChangeText={text => setnum(text)}
      />
      {signupError ? <ErrorMessage error={signupError} visible={true} /> : null}
      <ActivityButton
         onPress={onHandleSignup}
          title="Signup"
          btnState={loading}
        />
      <View style={styles.Buttom}>
        <TouchableOpacity
        >
        <Text style={{color:'#fff'}}>
          Already Have An Account?
        </Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={()=>{
          navigation.navigate("Login")
        }}
        >
        <Text style={{color:'#fff'}}>
         Login
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    alignSelf: 'center',
    paddingBottom: 24
  },
  content: {
    // position:'relative',
    // top:'50%',
    // transform:[{
    //   translateY: 50,
    // }]
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