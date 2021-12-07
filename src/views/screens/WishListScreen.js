import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image} from 'react-native';
import {FlatList,TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux'
import COLORS from '../../consts/colors';
import { ADD_CART,RM_WSH } from '../../../Store/Actions/ProductsActions';
const WishScreen = ({navigation}) => {

  const items = useSelector((state) => state.wishListItems.wishedItems)
  const dispatch = useDispatch() 

  const WishCard = ({item}) => {
    console.log(item)
    return (
      <View style={style.cartCard}>
        <Image source={item.image} style={{height: 80, width: 80}} />
        <View
          style={{
            height: 100,
            marginLeft: 10,
            paddingVertical: 20,
            paddingHorizontal:10
          
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 14}}>{item.name}</Text>
          <Text style={{fontSize: 12, color: COLORS.grey}}>
            {item.ingredients}
          </Text>
          <Text style={{fontSize: 17, fontWeight: 'bold'}}>${item.price}</Text>
        </View>
        <View style={{marginRight: 20, alignItems: 'center'}}>
          <View style={style.actionBtn}>
          <TouchableOpacity
            onPress={() => {
              dispatch(RM_WSH(item.id))
            }}
            >
            <Icon name="delete" size={20} color={COLORS.white} style={{position:'relative',}}/>
            </TouchableOpacity>
            <View style={{width:3,height:'76%',backgroundColor:'#fff',position:'relative'}}>

            </View>
            <TouchableOpacity
            onPress={() => {
              dispatch(ADD_CART(item.id))
              dispatch(RM_WSH(item.id))
            }}
            >
            <Icon name="shopping-cart" size={20} color={COLORS.white} style={{position:'relative',}} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1,justifyContent:'center',alignItems: items == 0? 'center':null}}>
      {items.length !==0?
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 80}}
        data={items }
        renderItem={({item}) => <WishCard item={item} />}
        ListFooterComponentStyle={{paddingHorizontal: 20, marginTop: 20}}
      />:
      <View style={style.empty}>
      <Text>
        No favorite item
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
    justifyContent:'center'
  },
  actionBtn: {
    width: 80,
    height: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    paddingLeft:5,
    paddingRight:5
  },
  empty:{
    position: 'absolute',
    // left: '50%',
    // top: '50%',
    // transform: [{
    //   translateY: 50
    // }],
    // transform: [{
    //   translateX: 50,
    // }],
  }
});

export default WishScreen;
