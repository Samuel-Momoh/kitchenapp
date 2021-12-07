// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up kitchen to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createStore,applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunk from 'redux-thunk';
import  {RootReducer} from './Store/Reducers/index'
import Routes from './src/views/navigation';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider as PaperProvider } from 'react-native-paper';
const Stack = createStackNavigator();
const store = createStore(RootReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

class App extends React.Component {
  constructor (props) {
    super(props);
  }
  ComponentWillMount () {

  }
  render () {
    return(
      <Provider store={store}> 
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <Routes />
        </PaperProvider>
      </PersistGate>
    </Provider>
    )
  }
}
export default App;
