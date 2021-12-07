import React,{ useState,useEffect } from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import {
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux'
import COLORS from '../../consts/colors';
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import {PrimaryButton,InputField} from '../components/index';
import { UPLOAD_IMG } from '../../../Store/Actions/ProductsActions'


const users = firestore().collection('users')


    // Update user details
    const updateUser = (docid,data) => {
      // Update Users
      users
      .doc(docid)
      .update(data)
      .then(() => {
        // dispatch(EDIT_USER({
        //   name: fname + Lname,
        //   email: user[0][0].email,
        //   phone: num
        // }))
        console.log('User updated!');
      });
    }

var uploadImageToStorage = async (uri) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  // const url = await Firebase.storage().ref(auth.currentUser.email).getDownloadURL();
  // console.log(url)
  let ref = storage().ref().child(auth().currentUser.email+'.jpg');
  return ref.put(blob).then(()=>{
    updateUser(user[0][0].id,{
      pic: true,
    })
      });

}

const handleSignOut = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.log(error);
    }
  };
// Upload picture
  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if(!pickerResult.cancelled) {
      uploadImageToStorage(pickerResult.uri);
      const NewUrl = storage().ref(auth().currentUser.email).getDownloadURL();
      dispatch(UPLOAD_IMG(NewUrl))

    }
 
  }


const UserProfile = ({navigation}) => {
  // useEffect(async () => {
  //   const url = await Firebase.storage().ref(auth().currentUser.email+'.jpg').getDownloadURL();
  //   setImg(url)
  // },[])
const user = useSelector((state) => state.users.users)
const userImg = useSelector((state) => state.users.userImg)
const dispatch = useDispatch()
  const [editing, setEditing] = useState(false);
  const [fname, setFname] = useState(user[0][0].name.split(" ")[0]);
  const [Lname, setLname] = useState(user[0][0].name.split(" ")[1]);
  const [num, setNum] = useState(user[0][0].phone);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
        <View style={style.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Details</Text>
      </View>
      <View style={style.textHeading}>
        <Text style={{fontSize:18}}>
          Your Account Details
        </Text>
        {editing?
        <TouchableOpacity
        onPress={() => {
          updateUser(user[0][0].id, {
            name: fname + " " + Lname,
            phone: num
          })
          setEditing(false)
        }}
        >
        <Text style={{fontSize:18,color:'rgb(249, 129, 58)'}}>
          Appy
        </Text>
        </TouchableOpacity>
        :
        <TouchableOpacity
        onPress={() => {
          setEditing(true)
        }}
        >
        <Text style={{fontSize:18,color:'rgb(249, 129, 58)'}}>
        Edit
      </Text>
      </TouchableOpacity>
        }
      </View>
      <View style={{height: 130, borderRadius: 40,display: 'flex',justifyContent:'center',flexDirection:'row'}}>
      <TouchableOpacity 
      style={{height: 130, borderRadius: 40, width: 100}}
      activeOpacity={0.8}  
      onPress={openImagePickerAsync} >
        <Image
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
            top: 10,
            borderRadius: 500,
          }}
          source={user[0][0].pic? {uri: userImg }: require('../../assets/Profile_avatar_placeholder_large.png')}
        />
         </TouchableOpacity>
      </View>
      
      <View style={style.textContainer}>
        <View>
        <InputField
       inputStyle={{
          fontSize: 14,
          color:COLORS.grey
        }}
        containerStyle={{
          backgroundColor: COLORS.light,
          marginBottom: 20
        }}
        placeholder='First Name'
        autoCapitalize='none'
        keyboardType='default'
        textContentType='name'
        autoFocus={true}
        editable={editing}
        
        value={fname}
        onChangeText={text => setFname(text)}
  />
          <InputField
       inputStyle={{
          fontSize: 14,
          color:COLORS.grey
        }}
        containerStyle={{
          backgroundColor: COLORS.light,
          marginBottom: 8
        }}
        placeholder='Last Name'
        autoCapitalize='none'
        keyboardType='default'
        textContentType='name'
        autoFocus={true}
        editable={editing}
        value={Lname}
        onChangeText={text => setLname(text)}
  />
          <InputField
       inputStyle={{
          fontSize: 14,
          color:COLORS.grey
        }}
        containerStyle={{
          backgroundColor: COLORS.light,
          marginBottom: 8
        }}
        placeholder='Email'
        autoCapitalize='none'
        keyboardType='email-address'
        textContentType='emailAddress'
        autoFocus={true}
        editable={false}
        value={user[0][0].email}
  />
            <InputField
       inputStyle={{
          fontSize: 14,
          color:COLORS.grey
        }}
        containerStyle={{
          backgroundColor: COLORS.light,
          marginBottom: 8
        }}
        placeholder='Phone Number'
        autoCapitalize='none'
        keyboardType='numeric'
        textContentType='telephoneNumber'
        autoFocus={true}
        editable={editing}
        value={num}
        onChangeText={text => setNum(text)}
  />
        </View>

        <PrimaryButton
          onPress={handleSignOut}
          title="LogOut"
        />
      </View>
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
  textHeading:{
    display:"flex",
    flexDirection:'row',
    justifyContent:'space-between',
    paddingLeft:10,
     paddingRight:10,
  },
  textContainer: {
    marginTop:0,
    flex: 1,
    paddingHorizontal: 50,
    justifyContent: 'space-between',
    paddingBottom: 40,
    // backgroundColor:'red'
  },
  indicatorContainer: {
    height: 50,
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentIndicator: {
    height: 12,
    width: 30,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    marginHorizontal: 5,
  },
  indicator: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: COLORS.grey,
    marginHorizontal: 5,
  },
});

export default UserProfile;
