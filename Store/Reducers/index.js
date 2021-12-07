import { combineReducers} from "redux";
// import ProductsReducers from "./ProductsReducers";
import CartReducers from "./CartReducers";
import WishReducers from "./WishListReducer";
import UserReducer from "./userDetailsReducer";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  debug:true
};


export const RootReducer = combineReducers({
    cartItems : persistReducer(persistConfig,CartReducers ),
    wishListItems : persistReducer(persistConfig,WishReducers),
    users:persistReducer(persistConfig,UserReducer),
  
  });