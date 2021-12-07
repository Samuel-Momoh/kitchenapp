import React,{ useState } from 'react';
import { useSelector, useDispatch, } from 'react-redux';
import {SafeAreaView, StyleSheet, View, Text, Image} from 'react-native';
import {ScrollView, TouchableOpacity,TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import {ActivityButton} from '../components/Button';
import firestore from '@react-native-firebase/firestore';
import { CLEAR_ITEM } from '../../../Store/Actions/ProductsActions'


const orderBook = firestore().collection('orders')
const orders_tracker = firestore().collection('orders_tracker')
const OrderSummary = ({navigation}) => {
  const [loading, setloading] = useState(false)
  const orders = useSelector((state)=> state.cartItems.addedItems );
const ordersTotal = useSelector((state)=> state.cartItems.total );
const userDetails = useSelector((state) => state.users.users)
const userAddress = useSelector((state) => state.users.address)
  const dispatch = useDispatch()
  const [DeliveryFee, setDeliveryFee] = useState(70);
  const [num, setNum] = useState('08166723207');

const onAddButtonPress =  () => {
  setloading(true)
  if (num && num !== '') {
    var orderNum = Math.floor(Math.random() * 1000000000)
      orders.map( async (order,i)=>{
        const data = {
          TIMESTAMP: new Date(),
          Orderid:orderNum,
          Trackid:`Etrack-${orderNum + i +1}`,
          user: userDetails[0][0].email,
          phone:num,
          item:order,
          destinaton:userAddress[0][0],
          total:ordersTotal,
          status:'pending',

      }
       await orderBook
          .add(data)
          .then(_doc => {
            const data = {
              TIMESTAMP: new Date(),
              Trackid:`Etrack-${orderNum + i +1}`,
             track:[
              { title: 'Order Confirmation',  isCurrent: true }
             ]
          }
           orders_tracker
              .add(data)
              .then(_doc => {
                // console.log("successful")
              })
              .catch((error) => {
                console.log(error)
              });
          })
          .catch((error) => {
              console.log(error)
          });
      })
      setloading(false)
      dispatch(CLEAR_ITEM())
      navigation.navigate("OrderConfirmation",orderNum)
}
   }
    const Orderlist = ({item}) => {
        return (
         <View style={style.listCon}>
      
             <View style={style.left}>
          <Text style={style.quantity}>X {item.quantity} </Text>
          <Text style={style.itemName}>{item.name}</Text>
             </View>
      
             <View style={style.right}>
          <Text style={style.itemPrice}>$ {(item.price * item.quantity).toFixed(2)}</Text>
             </View>
      
         </View>
        );
      };

  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1,fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'}}>
        <ScrollView showsVerticalScrollIndicator={false}>
         <View style={style.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Order Summary</Text>
      </View>
{/* Duration */}
      <View style={style.cartCard}>
        <Image source={require("../../assets/img/delivery.png")} style={style.image} />
        <View
          style={{
            height: 100,
            marginLeft: 10,
            paddingVertical: 20,
            flex: 1,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 16,fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'}}>Delivery</Text>
          <Text style={{fontSize: 13, color: COLORS.grey}}>
          Delivery In 45 - 90 Mins
          </Text>
        </View>
        <View style={{marginRight: 20, alignItems: 'center'}}>
          <TouchableOpacity
          onPress={() => navigation.navigate('TrackOrders')}
          >
          </TouchableOpacity>
        </View>
      </View>
{/* Location */}
<View style={style.cartCard}>
        <Image source={require("../../assets/img/location.jpg")} style={{width: 45, height: 45 }} />
        <View
          style={{
            height: 100,
            marginLeft: 10,
            paddingVertical: 20,
            flex: 1,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 16, fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'}}>Delivery Location</Text>
          <Text style={{fontSize: 13, color: COLORS.grey}}>
          Local Govt Council Okehi, Ecthe Rivers State
          </Text>
        </View>
        <View style={{marginRight: 20, alignItems: 'center'}}>
          <TouchableOpacity
          onPress={() => navigation.navigate('AddressScreen')}
          >
          <Text style={{ fontSize: 18, color: 'rgb(249, 129, 58)', textAlign: 'center',}}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Phone */}
      <View style={style.cartCard}>
        <Image source={require("../../assets/img/png-clipart-phone-phone.png")} style={{width: 45, height: 45 }} />
        <View
          style={{
            height: 100,
            marginLeft: 10,
            paddingVertical: 20,
            flex: 1,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 16,fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'}}>Phone Number</Text>
          <TextInput
            style={{flex: 1,
               fontSize: 18,
               borderBottomColor:'rgb(249, 129, 58)',
                borderBottomWidth:1,
                padding:5
              }}
            placeholder="Phone Number"
            value={num}
            onChangeText={(e)=>{
              setNum(e)
            }}
          /> 
        
        </View>
      </View>
          {/* Payment */}
          <View style={style.cartCard}>
        <Image source={require("../../assets/img/78013792-bill-payment-icon-bill-payment-icon-concept-bill-payment-icon-isolated.jpg")} style={style.image} />
        <View
          style={{
            height: 100,
            marginLeft: 10,
            paddingVertical: 20,
            flex: 1,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 16,fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'}}>Payment</Text>
          <Text style={{fontSize: 13, color: COLORS.grey}}>
          Payment By Quickteller
          </Text>
        
        </View>
      </View>
      <View style={{padding: 18, ...style.breakDown}}>
          <Text style={{fontWeight: 'bold', fontSize: 16,fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'}}>Items</Text>
          {
            orders.map((item,index)=>(
            <Orderlist key={index} item={item} />
            ))
          }
      </View>
      <View style={style.inputContainer}>
          <TextInput
            style={{flex: 1, fontSize: 18}}
            placeholder="Kitchen Voucher"
          />
           <View style={style.sortBtn}>
          <Text size={28} style={{color: COLORS.white}}>
          Apply
            </Text>
        </View>
        </View>
        <View style={{marginBottom: 100,padding: 18, ...style.breakDown}}>
          <Text style={{fontWeight: 'bold', fontSize: 16,fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'}}>SubTotal</Text>
    <View style={style.listCon}>
      {/* Items Totoal */}
      <View style={style.left}>
      <Text style={{...style.itemName,color:'grey',fontWeight:'bold'}}>Items</Text>
      </View>

       <View style={style.right}>
        <Text style={style.itemPrice}>$ {ordersTotal.toFixed(2)}</Text>
      </View>

         </View>
                   {/* Vat */}
         <View style={style.listCon}>
      <View style={style.left}>
      <Text style={{...style.itemName,color:'grey',fontWeight:'bold'}}>VAT(10%)</Text>
      </View>

       <View style={style.right}>
        <Text style={style.itemPrice}>$ {(0.1 * ordersTotal).toFixed(2)}</Text>
      </View>

         </View>
         {/* Delivery Fee */}
         <View style={style.listCon}>
      
      <View style={style.left}>
      <Text style={{...style.itemName,color:'grey',fontWeight:'bold'}}>Delivery Fee</Text>
      </View>

       <View style={style.right}>
        <Text style={style.itemPrice}>$ {DeliveryFee}</Text>
      </View>

         </View>

      </View>
     
      </ScrollView>
      <View style={style.placeOrder}>
          <View style={style.orderTotal}>
          <Text style={{fontWeight: 'bold', fontSize:18,fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'}}>Total(Inc VAT)</Text>
          <Text style={{fontWeight: 'bold', fontSize:18, color:'grey'}}>$ { (parseInt(DeliveryFee) + ordersTotal  + (0.1 * ordersTotal)).toFixed(2) }</Text>
          </View>
          <View style={style.placeBtn}>
          <ActivityButton
             onPress={()=>{
                // navigation.navigate("OrderConfirmation")
                onAddButtonPress()
             }
            }
            title="Place Order"
            btnState={loading}
             />
        
          </View>
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
  cartCard: {
    height: 100,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    // marginVertical: 10,
    marginHorizontal: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:10
  },
  actionBtn: {
    width: 80,
    height: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  breakDown: {
    margin: 15,
  },

  listCon: {
    marginTop:10,
    display:'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
    width:'100%',
  },
  left: {
    display:'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
    fontSize:18
  },
  quantity:{
      fontWeight:'bold',
      marginRight:15,
      fontSize:15,
  },
  itemName: {
      color: '#000',
      fontSize:15,
  },
  right: {
      color:'#000',
      fontSize:18
  },
  itemPrice: {
    fontWeight:'bold',
    fontSize:15,
  },
  inputContainer: {
    flex: 1,
    height: 50,
    width:'95%',
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: COLORS.light,
    alignItems: 'center',
    justifyContent:'center',
    alignSelf:'center',
    paddingHorizontal: 20,
    paddingRight: 2,
  },
  sortBtn: {
    width: 50,
    height: 50,
    marginLeft: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeOrder: {
    position:'absolute',
    bottom:0,
    width:'100%',
    height:120,
    backgroundColor:COLORS.white,
  },
  orderTotal: {
    display: 'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    padding: 20,
  },
  placeBtn: {
    display: 'flex',
    justifyContent:'center',
    // position:'absolute',
    left: 40,
    bottom: 10,
    height: 60,
    width: '80%',
    borderRadius: 20,
    textAlign: 'center',
  },
  image: {
    width: 60,
    height:60,
  }
});

export default OrderSummary;
