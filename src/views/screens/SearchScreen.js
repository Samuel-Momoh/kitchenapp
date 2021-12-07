import React,{useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image,} from 'react-native';
import {FlatList, TouchableOpacity,  TextInput, ScrollView,} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import foods from '../../consts/foods';
import {PrimaryButton} from '../components/Button';

const SearchScreen = ({navigation}) => {

const [search, setsearch] = useState('')
  const OrderCard = ({item,index}) => {
    return (
      <View>
      <TouchableOpacity
      onPress={() => navigation.navigate('DetailsScreen',item)}
      >
      <View style={style.cartCard} >
        <Image source={item.image} style={{height: 80, width: 80}} />
        <View
          style={{
            height: 100,
            marginLeft: 10,
            paddingVertical: 20,
            flex: 1,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>{item.name}</Text>
          <Text style={{fontSize: 13, color: COLORS.grey}}>
            {item.ingredients}
          </Text>
          <Text style={{fontSize: 17, fontWeight: 'bold'}}>${item.price}</Text>
        </View>

      </View>
      </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
            <View
        style={{
          marginTop: 40,
          flexDirection: 'row',
          paddingHorizontal: 20,
        }}>
        <View style={style.inputContainer}>
          <Icon name="search" size={28} />
          <TextInput
            style={{flex: 1, fontSize: 18}}
            placeholder="Search for food"
            value={search}
            onChangeText={(e)=>{
              setsearch(e)
              // console.log(e)
            }}
          />
          
        </View>
      </View>
<ScrollView>
      <View>
        {
          foods.filter((e)=>(e.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || e.ingredients.includes(search.toLocaleLowerCase()) )).map((item,index)=>(
            <OrderCard item={item} key={index} />
          ))
        }
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

  inputContainer: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: COLORS.light,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});

export default SearchScreen;
