import React,{useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector} from 'react-redux'
import COLORS from '../../consts/colors';
import foods from '../../consts/foods';


const OrderScreen = ({navigation}) => {
  const orders = useSelector((state) => state.users.orders)
  console.log(orders)
  const OrderCard = ({item}) => {
    return (
      <View style={style.cartCard}>
        <Image source={foods[parseInt(item.item.id)-1].image} style={{height: 80, width: 80}} />
        <View
          style={{
            height: 100,
            marginLeft: 10,
            paddingVertical: 20,
            flex: 1,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 14}}>{item.Orderid}</Text>
          <Text style={{fontSize: 12, color: COLORS.grey}}>
            {item.item.name}
          </Text>
          <Text style={{fontSize: 17, fontWeight: 'bold'}}>${parseInt(item.item.price) * parseInt(item.item.quantity)}</Text>
        </View>
        <View style={{marginRight: 20, alignItems: 'center'}}>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>{item.item.quantity}</Text>
          <TouchableOpacity
          onPress={() => navigation.navigate('TrackOrders',item.Trackid)}
          >
          <View style={style.actionBtn}>
          <Text style={{fontWeight: 'bold', fontSize: 18, color: '#fff', textAlign: 'center'}}>Track</Text>
          </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1,position:'relative',justifyContent:'center',alignItems: orders == null? 'center':null}}>
      {orders !== null?
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 80}}
        data={orders}
        renderItem={({item}) => <OrderCard item={item} />}
        ListFooterComponentStyle={{paddingHorizontal: 20, marginTop: 20}}
      />
      :
      <View style={style.empty}>
      <Text>
        No Recent Order Yet
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
  }
});

export default OrderScreen;
