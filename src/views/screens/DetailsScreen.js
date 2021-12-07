import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image,Dimensions} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import {SecondaryButton} from '../components/Button';
import { useDispatch, useSelector } from 'react-redux'
import { ADD_CART, ADD_WSH,RM_WSH } from '../../../Store/Actions/ProductsActions'

const {width, height} = Dimensions.get('screen');
const detailsHeight = height * (1/3);
const surfHeight= height - detailsHeight - 125

const DetailsScreen = ({navigation, route}) => {
  const item = route.params;
  const dispatch = useDispatch()
  const wishList = useSelector((state) => state.wishListItems.wishedItems)
  const cartList = useSelector((state) => state.cartItems.addedItems)
  let wishState = wishList.find(items=> items.id === item.id)
  let cartState = cartList.find(items=> items.id === item.id)

  return (
    <SafeAreaView style={{backgroundColor: COLORS.white}}>
      <View style={style.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Details</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 280,
          }}>
          <Image source={item.image} style={{height: 220, width: 220}} />
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
              {item.name}
            </Text>
            <View style={style.iconContainer}>
              {wishState? 
               <TouchableOpacity
               onPress={()=>{
                 dispatch(RM_WSH(item.id))
                }}
               >
               <Icon name="favorite" color={COLORS.primary} size={25} />
 
               </TouchableOpacity>:
               <TouchableOpacity
               onPress={()=>{
                 dispatch(ADD_WSH(item.id))
                }}
               >
               <Icon name="favorite-border" color={COLORS.primary} size={25} />
 
               </TouchableOpacity>
            }
            </View>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={style.detailsText}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
            
          </Text>
          </ScrollView>
          <View style={style.addToCart}>
          {cartState?
          <SecondaryButton
          title="View In Cart"
          onPress={() => navigation.navigate('Cart')}
          />:
          <SecondaryButton
             title="Add To Cart"
             onPress={()=>{
              dispatch(ADD_CART(item.id))
             }}
             />
        }
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
    paddingTop: 20,
    paddingBottom: 65,
    backgroundColor: COLORS.primary,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    minHeight:300,
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
    lineHeight: 20,
    fontSize: 16,
    color: COLORS.white,
  },
  addToCart:{
    marginLeft: 20,
    marginTop:5,
    marginBottom:15,
    display: 'flex',
    width: '100%',
    height: 60,
    borderRadius: 20,
    textAlign: 'center',
  }
});

export default DetailsScreen;
