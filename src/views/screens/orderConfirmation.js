import React from 'react'
import {SafeAreaView, StyleSheet, View, Text, Image,Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {PrimaryButton} from '../components/Button';
import COLORS from '../../consts/colors';
const {height} = Dimensions.get('screen');
const OrderConfirmation = ({navigation, route}) =>{
  const orderNum = route.params
return(
<SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
<View style={style.con}>
<Text style={{fontWeight:'bold',fontSize:20,color:'grey',marginBottom:5}}>ORDER SUCCESSFUL</Text>
<Text style={{fontWeight:'bold',color:'#ddd'}}><Text style={{fontWeight:'bold',color:'#000'}}>Order No: {orderNum}</Text> </Text>
<View style={style.btnStyle}>
<PrimaryButton
          onPress={()=>{
            navigation.navigate("HomePage")
          }}
          title="Back Home"
        />
</View>
</View>
</SafeAreaView>
)
}

const style = StyleSheet.create({
con: {
    width:'100%',
    height:height,
    display: 'flex',
    justifyContent:'center',
    alignItems:'center'
},
btnStyle: {
    marginTop:8,
    width:'60%'
}
});
export default OrderConfirmation;
