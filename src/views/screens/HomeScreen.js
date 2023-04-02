
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';
import {
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';

import React,{ useEffect, useContext,} from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import categories from '../../consts/categories';
import foods from '../../consts/foods';
import { useSelector,useDispatch } from 'react-redux'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage';
import { LOAD_USER,LOAD_ADDR,LOAD_ORDERS} from '../../../Store/Actions/ProductsActions'
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';

const {width} = Dimensions.get('screen');
const cardWidth = width / 2 - 20;

const users = firestore().collection('users')
const firAddress = firestore().collection('address_book')
const orders = firestore().collection('orders')
const products = firestore().collection('product')

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch()
  const { user } = useContext(AuthenticatedUserContext);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
  const [filter, setFilter] = React.useState('');
  const [loadingProduct, setloadingProduct] = React.useState(false)
  const userDetails = useSelector((state) => state.users.users)
const userImg = useSelector((state) => state.users.userImg)
const address = useSelector((state) => state.users.address)
// console.log(userImg)
useEffect(() => {
  (async () => {
          // Function Only runs if User is currently login
          if(user !== null){
            // Get users
           users
           .where("email", "==", user.email)
           .orderBy('name', 'desc')
           .onSnapshot(
               querySnapshot => {
                 //  console.log(querySnapshot);
                  const newEntities = []
                  querySnapshot.forEach(doc => {
                      const entity = doc.data()
                      entity.id = doc.id
                      newEntities.push(entity)
                  });
                 
               dispatch(LOAD_USER(newEntities))
               },
               error => {
                  //  console.log(error)
               }
           )
         
          // Only Run if User Address is Set
          if(userDetails[0][0].address){
                 // Get users Address
                 firAddress
                 .where("user", "==", user.email)
                 .orderBy('formatted', 'desc')
                 .onSnapshot(
                     querySnapshot => {
                       //  console.log(querySnapshot);
                        const newEntities = []
                        querySnapshot.forEach(doc => {
                            const entity = doc.data()
                            entity.id = doc.id
                            newEntities.push(entity)
                        });
                        // console.log(newEntities)
                     dispatch(LOAD_ADDR(newEntities))
                     },
                     error => {
                         console.log(error)
                     }
                 )
  
     }
     try {
            // Get users orders
               orders
                 .where("user", "==", user.email)
                 .orderBy('Orderid', 'desc')
                 .onSnapshot(
                     querySnapshot => {
                       //  console.log(querySnapshot);
                        const newEntities = []
                        querySnapshot.forEach(doc => {
                            const entity = doc.data()
                            entity.id = doc.id
                            newEntities.push(entity)
                        });
                        newEntities.length !==0?
                        dispatch(LOAD_ORDERS(newEntities))
                        :
                        dispatch(LOAD_ORDERS(null))
                     },
                     error => {
                         console.log(error)
                     }
                 )
     } catch (error) {
       console.log(error)
     }
       
        
            }
    products
    .where("food", "==", "Bugger")
    .orderBy('price', 'desc')
    .onSnapshot(
        querySnapshot => {
          //  console.log(querySnapshot);
           const newEntities = []
           querySnapshot.forEach(doc => {
               const entity = doc.data()
               entity.id = doc.id
               newEntities.push(entity)
           });
          //  console.log(newEntities)
        },
        error => {
            console.log(error)
        }
    )

  
  })();
}, []);


  const ListCategories = () => {
    
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={style.categoriesListContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => {
              setSelectedCategoryIndex(index)
              // const newData = foods.filter((item) => {
              //   return item.id == index;
              // });
              if(category.ctId.match("food_0")){
                setFilter('')
              }else{
                setFilter(category.ctId)
              }
              
            }
            }>
            <View
              style={{
                backgroundColor:
                  selectedCategoryIndex == index
                    ? COLORS.primary
                    : '#fff',
                    width:80,
                    borderRadius:30,
                    height:120,
                    transition: 'width .2s ease-in-out',
              }}>
                
              <View style={style.categoryBtnImgCon}>
                <Image
                  source={category.image}
                  style={{height: '100%', width: '100%', resizeMode: 'cover'}}
                />
              </View>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  marginLeft: 10,
                  textAlign:'center',
                  color:
                    selectedCategoryIndex == index
                      ? COLORS.white
                      : COLORS.primary,
                }}>
                {category.name}
               
              </Text>
              <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                marginLeft: 10,
                textAlign:'center',
                color:'#fff',
                // position:'absolute',
                // bottom:10,
                // left:'30%'
                
              }}
              >{
                category.ctId=="food_0"?
                foods.length
              :
              foods.filter((item)=> item.categoryId.includes(category.ctId)).length
              } </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };
  
  const Card = ({food}) => {
    return (
      <TouchableHighlight
        underlayColor={COLORS.white}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('DetailsScreen', food)}>
        <View style={style.card}>
          <View style={{alignItems: 'center', top: -20}}>
            <Image source={food.image} style={{height: 80, width: 80}} />
          </View>
          <View style={{marginHorizontal: 20}}>
            <Text style={{fontSize: 14, fontWeight: 'bold'}}>{food.name}</Text>
            <Text style={{fontSize: 12, color: COLORS.grey,}}>
              {food.ingredients}
            </Text>
          </View>
          <View
            style={{
              marginTop: 10,
              marginHorizontal: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            ₦{food.price}
            </Text>
            <View style={style.addToCartBtn}>
              <Icon name="add" size={20} color={COLORS.white} />
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <TouchableOpacity
      onPress={() =>{
        userDetails[0][0].address?
        navigation.navigate('AddressScreen')
        :
        navigation.navigate('Addaddress')
      }}
      
     
      >
        <View style={style.address}>
        <View style={style.adDetails}>
        <Text style={{fontSize: 17, fontWeight: 'bold',color:'rgb(249, 129, 58)'}}>Delivery TO</Text>
        <Text style={{fontSize: 13}}>
          {
            userDetails[0][0].address?
            address.length !==0?
            address[0][0].formatted
            :
            null
            :
            "Click To Set Address"
          }
          </Text>
        </View>
        <Icon name="flag" size={28} style={{...style.drop,color:'rgb(249, 129, 58)'}} />
      </View>
      </TouchableOpacity>
      <View style={style.header}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 28}}>Hello,</Text>
            <Text style={{fontSize: 28, fontWeight: 'bold', marginLeft: 10}}>
              {userDetails.length !==0? userDetails[0][0].name.split(" ")[0] : null }
    
            </Text>
          </View>
          <Text style={{fontSize: 22, color: COLORS.grey}}>
            What do you want today
          </Text>
        </View>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('UserProfile')}>

        {
          userDetails.length !==0?
          <Image
          // source={ require('../../assets/person.png')}
          
          source={userDetails[0][0].pic? {uri: userImg }: require('../../assets/Profile_avatar_placeholder_large.png')}
          
          style={{height: 50, width: 50, borderRadius: 25}}
        />
        :
        <ActivityIndicator size='large' color="#F9813A" style={{height: 50, width: 50}}/>
       
        
        }

        </TouchableOpacity>
      </View>
      <View>
        <ListCategories />
      </View>
      <ScrollView
        Vertical
        showsVerticalScrollIndicator={false}
        
      >
        <View style={{display: 'flex', flexDirection: 'row',flexWrap:'wrap',flex: 2,justifyContent: 'center', alignItems: 'center'}}>
        {
          foods.filter((item)=> item.categoryId.includes(filter) ).map((item,index)=>(
          <Card key={index} food={item} />
          ))
        }
         
          {/* <ActivityIndicator size='large' color="#F9813A"/> */}
       
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },

  categoriesListContainer: {
    paddingVertical: 5,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  categoryBtnImgCon: {
    marginTop:5,
    marginLeft:20,
    position:'relative',
    height: 40,
    width: 40,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    display:'flex',
    flexDirection:'row',
    justifyContent: 'center',
  },
  card: {
    minHeight: 170,
    width: cardWidth,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 50,
    borderRadius: 15,
    elevation: 13,
    backgroundColor: COLORS.white,
  },
  addToCartBtn: {
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  address: {
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
  adDetails: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    // width: '100%'

  },
  drop: {
    // marginRight:'15px'
  }
});

export default HomeScreen;
