import React ,{Component}from 'react';
import {SafeAreaView,StyleSheet, View,FlatList,
  Text,Image,StatusBar, TextInput,Dimensions, ScrollView,} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { Carousel, Button } from '@ant-design/react-native';
const {width} = Dimensions.get("window");
const w=width/640;
const goods =[
  {
    img:require("../../assets/fw1.png"),
    tit:"居家维修保养",
    dot:">",
  },
  {
    img:require("../../assets/fw2.png"),
    tit:"住宿优惠        ",
    dot:">",
  },
  {
    img:require("../../assets/fw3.png"),
    tit:"出行接送        ",
    dot:">",
  },
  {
    img:require("../../assets/fw4.png"),
    tit:"E族活动        ",
    dot:">",
  },
]
export default class Service extends Component{
render(){
  return (
    <View >
      <StatusBar backgroundColor="red" translucent={true}/>
      <ScrollView>
      <SafeAreaView  style={{flexDirection:'row',backgroundColor:"#f23030"}}>
        <View style={{ 
            flexDirection: 'row',
            justifyContent:'center',
            backgroundColor:"#f23030",
            height:40,
            marginTop:40,
            marginLeft:15,
            marginBottom:10,
            }}>
            <View style={{
                width:'80%',
                backgroundColor:'#fbb8b8',
                marginRight:10,
                borderRadius:20,
                flexDirection:'row',
                alignItems:'center',
                paddingLeft:20
                }}>
                <Icon name="search" style={{fontSize:30,color:"white"}} />
                <TextInput placeholder='请输入您要搜索的关键字'
                    style={{color:"white",fontSize:16}} ></TextInput>
            </View>
            <Icon name="shopping-cart" style={{color:"white",fontSize:30,marginTop:2,marginLeft:20}}/>
            </View> 
       </SafeAreaView>
       <Carousel
        autoplay
        infinite
        dotStyle={{ backgroundColor: "white" }}
        dotActiveStyle={{ backgroundColor: "red" }}
        style={{overflow:"hidden",height:240}}>
         <Image source={require("../../assets/ser2.png")} style={styles.car}/>
         <Image source={require("../../assets/ser1.png")} style={styles.car}/>
         <Image source={require("../../assets/ser2.png")} style={styles.car}/>
       </Carousel>
       <FlatList 
          data={goods}
          renderItem={({item})=>(
              <View style={styles.flat}>
                <View >
                <Image 
                  style={styles.flimg}
                  source={item.img}/>
                </View>
                <View>
                <Text 
                  style={{fontSize:16,marginLeft:30*w}}
                  >{item.tit}</Text>
                  </View>
                 <View>
                  <Text 
                   style={{marginLeft:320*w,color:"gray",fontSize:26}}
                    >{item.dot}</Text>
                 </View>
              </View>
          )}
          />
          <Button style={styles.btn}>
            <Text style={{color:"white"}}>发布需求</Text>
          </Button>
          <Text style={styles.bq}>©E族之家 版权所有</Text>
      </ScrollView>
    </View>
  );
};

}
const styles = StyleSheet.create({
  box:{
    width:"30%",
    height:250,
    backgroundColor:"blue",
    marginTop:'3%'
  },
  text:{
    color:'red',
    fontSize:20
  },
  flat:{
    backgroundColor:"white",
    flexDirection: 'row',
    alignItems:"center",
    justifyContent:"center",
    marginTop:20*w,
  },
  size:{
    fontSize:30
  },
  car:{
    width:width,
    height:w*360,
  },
  flimg:{
    height:80*w,
    width:80*w,
    borderRadius:40*w,
    flexDirection: 'row',
    justifyContent:'center',
    marginTop:10*w,
    marginBottom:10*w,
  },
  btn:{
    backgroundColor:"red",
    marginLeft:20*w,
    width:600*w,
    marginTop:30*w,
    marginBottom:80*w,
  },
  bq:{
    textAlign:"center",
    color:"gray",
    marginBottom:20*w,
  }
});

