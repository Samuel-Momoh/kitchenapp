import React from 'react';
import { View,StyleSheet, } from 'react-native';


const Orderlist = () => {
  return (
   <View style={styles.listCon}>

       <View style={styles.left}>
    <Text style={styles.quantity}>X1</Text>
    <Text style={styles.itemName}>Cheese Pizza</Text>
       </View>

       <View style={styles.right}>
    <Text style={styles.itemPrice}>$ 100</Text>
       </View>

   </View>
  );
};

const styles = StyleSheet.create({
  listCon: {
    display:'flex',
    flexDirection: 'row',
    justifyContents:'space-between',
    with:'100%'
  },
  left: {
    display:'flex',
    flexDirection: 'row',
    justifyContents:'space-between',
    with:'70%'
  },
  quantity:{
      fontWeight:'bold'
  },
  itemName: {
      color: '#000'
  },
  right: {
      color:'#000'
  },
  itemPrice: {
    fontWeight:'bold'
  },
});

export default Orderlist;