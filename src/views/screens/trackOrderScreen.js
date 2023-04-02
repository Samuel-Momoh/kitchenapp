
import React,{useEffect,useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text,Image,Dimensions, ActivityIndicator} from 'react-native';
import {ScrollView, TouchableOpacity,} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../../consts/colors';
import firestore from '@react-native-firebase/firestore';

const orders_tracker = firestore().collection('orders_tracker')
// const data = [
//   { title: 'Order Confirmation',  isCurrent: false },
//   { title: 'Food Is Ready',  isCurrent: false },
//   { title: 'Shipped',  isCurrent: false },
//   { title: 'Delivered',  isCurrent: true },
// ];
const {width, height} = Dimensions.get('screen');
const screenHeight = height - 90;

const MapProgress = (props) => {
  if (!props.data || props.data.lenght === 0) return null;
// console.log(props)
  return (
    <View style={{ flex: 1 }}>
      <View style={{...style.verticalLine,height: props.data.lenght === 1? '0%': null}}></View>
      <View style={style.verticalWrap}>

        {props.data.map((item,i) => (
          <View style={style.itemWrap} key={i}>
            <View style={{...style.pointWrap,opacity: item.isCurrent ? null: .8}}>
              <Ionicons  name="checkmark" size={20} 
              style={[
                style.markerText,
                item.isCurrent ? style.currentText : null,
              ]}
              />
            </View>
            <View style={{ marginLeft: 5, flex: 1, }}>
              <Text style={item.isCurrent ? style.currentMarker : null}>
                {item.title}
              </Text>
              <Text>
              { item.TIMESTAMP}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const TrackOrders = ({navigation, route}) => {
  const TrackNum = route.params;
  // console.log(TrackNum)
  const [trackStatus, setTrackStatus] = useState(null)


  useEffect(() => {
    async function fetchDetails() {
       // Get Track Details
       const trackerArr = []
       const tracker = await firestore().collection('orders_tracker')
       .where("Trackid", "==", TrackNum) 
       .get()
       tracker.docs.map((doc )=> {
         const entity = doc.data()
         entity.id = doc.id
         trackerArr.push(entity)
        

       });
      //  console.log(trackerArr[0].track)
       trackerArr.length !==0?
               setTrackStatus(trackerArr[0].track)
               :
               setTrackStatus([])

          
      //  orders_tracker
      //  .where("Trackid", "==", TrackNum)
      //  .orderBy('track', 'desc')
      //  .onSnapshot(
      //      querySnapshot => {
      //         const newEntities = []
      //         querySnapshot.forEach(doc => {
      //             const entity = doc.data()
      //             entity.id = doc.id
      //             newEntities.push(entity)
      //         });
      //         // console.log(newEntities)
      //         newEntities.length !==0?
      //         setTrackStatus(newEntities)
      //         :
      //         setTrackStatus(null)
      //      },
      //      error => {
      //          console.log(error)
      //      }
      //  )
     
    }
// console.log(trackStatus)
    fetchDetails()
  }, [])
 
  return (
    <SafeAreaView style={{backgroundColor: COLORS.white}}>
      <View style={style.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Track Order</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            height: screenHeight,
          }}>
            <View style={style.agent}>

              <View style={style.agentLeft}>
                <View style={style.agentImg}>
            <Image source={require("../../assets/img/location.jpg")} style={{width: 50, height: 50 }} />
            </View>
            <View style={style.agentDis}>
            <Text style={{lineHeight:30,fontWeight:'bold'}}>DHL Express Delivery</Text>
              <Text style={{color:'grey'}} > 20th Oct To 30th Oct </Text>
              </View>
            </View>

            <View style={style.agentRight}>
              <TouchableOpacity
              onPress={()=>{
              null
              }}
              >
            <Text style={{fontWeight: 'bold', fontSize: 12, color: '#fff', textAlign: 'center',lineHeight:30}}>Track On Website</Text>
            </TouchableOpacity>
            </View>

            </View>
      <View style={style.orderHead}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000'}}>
          Track No
        </Text>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'grey'}}>
        {TrackNum}
        </Text>
      </View>
    <View style={{ flex: 1, height: '80%',marginTop:20 }} >
      {
        trackStatus !== null?
        <MapProgress data={[...trackStatus]} />
        :
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' color="#F9813A"/>
      </View>
      }
      </View>
          {/* <Image source={require('../../assets/person.png')} style={{height: 220, width: 220}} /> */}
          
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
  iconContainer: {
    backgroundColor: COLORS.white,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  detailsText: {
    marginTop: 10,
    lineHeight: 22,
    fontSize: 16,
    color: COLORS.white,
  },
  addToCart:{
    marginRight: 40,
    display: 'flex',
    justifyContent:'center',
    position:'absolute',
    bottom: 8,
    width: '100%',
    height: 60,
    borderRadius: 20,
    textAlign: 'center',
  },
  verticalLine: {
    backgroundColor: 'rgb(249, 129, 58)',
    width: 2,
    height: '73%',
    position: 'absolute',
    marginLeft: 40,
    marginTop: 20,
  },
  verticalWrap: {
    justifyContent: 'space-between',
    height: '80%',
  },
  itemWrap: {
    width: 200,
    height: 40,
    marginLeft: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointWrap: {
    height: 30,
    width: 30,
    borderRadius:30,
    marginLeft: 5,
    alignItems: 'center',
    backgroundColor:'rgb(249, 129, 58)',
    textAlign:'center'
  },
  firstPoint: {
    backgroundColor: 'black',
    borderRadius: 20,
    height: 10,
    width: 10,
    marginLeft: 10,
  },
  markerText: { color: 'white', lineHeight:30 },
  currentMarker: { color: 'rgb(249, 129, 58)' },
  currentText: { color: '#fff' },
  orderHead: {
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    paddingLeft:10,
    paddingRight:10,
    marginBottom:15
  },
  agent: {
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    paddingLeft:10,
    paddingRight:10,
    marginBottom:15
  },
  agentLeft: {
    display:'flex',
    flexDirection:'row',
    alignItems:'center'
  },
  agentImg: {
    marginRight: 10
  },
  agentDis: {
  //  position:'relative',
  //  top:'50%',
  //  transform:[{
    // translateY: '-50%',
  // }]'
  },
  agentRight: {
    position: 'relative',
    // top: '50%',
    // transform: [{
    //   translateY: 50,
    // }],
    backgroundColor: 'rgb(249, 129, 58)',
    borderRadius: 20,
    padding: 8,
    textAlign:'center',
    color:'#fff',
    display:'flex',
    alignItems:'center'
},

},
);

export default TrackOrders;
