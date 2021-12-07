import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text,ActivityIndicator} from 'react-native';
import COLORS from '../../consts/colors';

const PrimaryButton = ({title, onPress = () => {}}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={style.btnContainer}>
        <Text style={style.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};
const ActivityButton = ({btnState,title, onPress = () => {}}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={btnState? null : onPress}>
      <View style={{...style.btnContainer, opacity: btnState? .8 : null}}>
        {
          btnState? <ActivityIndicator size='large' color='#fff' />: <Text style={style.title}>{title}</Text>
        }
        
      </View>
    </TouchableOpacity>
  );
};
const SecondaryButton = ({title, onPress = () => {}}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={style.btn2Container}>
        <Text style={style.title2}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  title: {color: COLORS.white, fontWeight: 'bold', fontSize: 18},
  title2: {color: COLORS.primary, fontWeight: 'bold', fontSize: 18},
  btnContainer: {
    backgroundColor: COLORS.primary,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn2Container: {
    marginRight: 40,
    backgroundColor: COLORS.white,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {PrimaryButton, SecondaryButton,ActivityButton};
