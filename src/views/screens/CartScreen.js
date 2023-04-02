import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image} from 'react-native';
import {FlatList,TouchableOpacity} from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import {PrimaryButton} from '../components/Button';
import { ADD_QTY,SUB_QTY } from '../../../Store/Actions/ProductsActions'


const CartScreen = ({navigation}) => {

  const cartItems = useSelector((state) => state.cartItems.addedItems)
  const total = useSelector((state) => state.cartItems.total)

  
  const dispatch = useDispatch()
  const CartCard = ({item}) => {
    return (
      <View style={style.cartCard}>
        <Image source={item.image} style={{height: 80, width: 80}} />
        <View
          style={{
            height: 100,
            marginLeft: 10,
            paddingVertical: 20,
            // flex: 1,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>{item.name}</Text>
          <Text style={{fontSize: 13, color: COLORS.grey}}>
            {item.ingredients}
          </Text>
          <Text style={{fontSize: 17, fontWeight: 'bold'}}>₦{item.price}</Text>
        </View>
        <View style={{marginRight: 20, alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>{item.quantity}</Text>
          <View style={style.actionBtn}>
            <TouchableOpacity
            onPress={() => {
              dispatch(SUB_QTY(item.id))
            }}
            >
            <Icon name="remove" size={25} color={COLORS.white} />
            </TouchableOpacity>

            <TouchableOpacity
            onPress={() => {
              dispatch(ADD_QTY(item.id))
            }}
            >
            <Icon name="add" size={25} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1,position:'relative',justifyContent:'center',alignItems: cartItems == 0? 'center':null}}>
     {cartItems.length !==0?
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 80}}
        data={cartItems}
        renderItem={({item}) => <CartCard item={item} />}
        ListFooterComponentStyle={{paddingHorizontal: 20, marginTop: 20}}
        ListFooterComponent={() => (
          <View>
            <View
              style={
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 15,
              }
              }>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                Total Price
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>₦{total.toFixed(2)}</Text>
            </View>
            <View style={{marginHorizontal: 30}}>
              <TouchableOpacity
              onPress={()=>{
                 navigation.navigate("OrderSummary")
              }}
              >
               
              <PrimaryButton title="CHECKOUT" />

              </TouchableOpacity>
            </View>
          </View>
        )}
      />:
      <View style={style.empty}>
      <Text>
        No item in the cart
      </Text>
    </View>
            }
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
    elevation: 15,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    // width:'100%'
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
  empty:{
    position: 'absolute',
    // left: '50%',
    // top: '50%',
    // transform: [{
    //   translateX: -50,
    //   translateY: 50,
    // }],
  }
});


export default CartScreen;
