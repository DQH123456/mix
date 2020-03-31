import React, { Component } from "react"
import { View ,Image,Text,Dimensions, Alert,ScrollView,StyleSheet,StatusBar,
    FlatList, ImageBackground,TouchableOpacity,AsyncStorage} from "react-native"
import {Actions} from 'react-native-router-flux';
import ImageCropPicker from 'react-native-image-crop-picker';
import { Button } from "@ant-design/react-native";
const {width} = Dimensions.get("window");
const w=width/640;
const person=[
    {
        tit:'账户管理    ',
        img:require("../../assets/zh.png")
    },
    {
        tit:'收货地址    ',
        img:require("../../assets/dizhi.png")
    },
    {
        tit:'  我的信息',
        img:require("../../assets/xinxi.png")
    },
    {
        tit:'我的订单    ',
        img:require("../../assets/dingdan.png")
    },
    {
        tit:'我的二维码',
        img:require("../../assets/erwei.png")
    },
    {
        tit:'  我的积分',
        img:require("../../assets/jifen.png")
    },
    {
        tit:'我的收藏',
        img:require("../../assets/shoucang.png")
    },
]
const act =[
    {
        tit:'居家维修保养',
        img:require("../../assets/baoyang.png")
    },
    {
        tit:'出行接送',
        img:require("../../assets/car.png")
    },
    {
        tit:'我的受赠人',
        img:require("../../assets/ren.png")
    },
    {
        tit:'我的住宿优惠',
        img:require("../../assets/bed.png")
    },
    {
        tit:'我的活动',
        img:require("../../assets/huodong.png")
    },
    {
        tit:'我的发布',
        img:require("../../assets/fabu.png")
    },
]
const out = act.out;
export default class LocalPage extends Component{
    constructor(){
        super();
        this.state = {
            imageUrl:''
        }
    }
    takephoto = ()=>{
        ImageCropPicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
          }).then(image => {
            this.setState({imageUrl:{uri:image.path}})
          });
    }
    exit= async() => {
        await AsyncStorage.clear();
        Alert.alert("退出","已退出该账号",[{text: '确定', onPress: () => { Actions.login()}}])
    }
    render(){
        return(
            <View  style={{backgroundColor:"white"}}>
                <StatusBar backgroundColor="red" translucent={true}/>
                <ScrollView>
                <View style={styles.box}>
                    <ImageBackground style={styles.moren1}
                        source={require('../../assets/moren.png')}>
                        <TouchableOpacity onPress={()=>{this.takephoto()}} style={styles.moren}>
                            {/* <Image source={this.state.imageUrl} style={styles.img} /> */}
                        </TouchableOpacity>
                    </ImageBackground>
                    <Text style={styles.p1}>BINNU DHILLON</Text>
                </View>
                <Image source={require("../../assets/minebc.png")} style={{width:642*w}}/>
                <View style={styles.person}>
                    <View>
                        <Image source={require('../../assets/wode.png')}
                         style={styles.perimg}/>    
                    </View>
                    <View>
                        <Text style={{fontSize:18}}>我的个人中心</Text>
                    </View>
                </View>
                <FlatList 
                data={person}
                numColumns={3}
                renderItem={({item})=>(
                    <View style={styles.per}>
                        <Image 
                            // resizeMethod="contain"
                            style={styles.pic}
                            source={item.img}/>
                        <Text 
                            style={{marginTop:15,marginBottom:10}}
                        >{item.tit}</Text>
                        </View>
                )}
                />
                <View style={{backgroundColor:"#eeeeee",height:10}}></View>
                <View style={styles.person}>
                    <View>
                        <Image source={require('../../assets/ezu.png')}
                         style={styles.perimg}/>
                    </View>
                    <View>
                        <Text style={{fontSize:18}}>E族活动</Text>
                    </View>
                </View>
                <FlatList 
                data={act}
                numColumns={3}
                renderItem={({item})=>(
                    <View style={styles.per}>
                        <Image 
                            // resizeMethod="contain"
                            style={styles.pic}
                            source={item.img}/>
                        <Text 
                            style={{marginTop:5,marginBottom:10}} onPress={()=>Actions.issue()}
                        >{item.tit}</Text>
                    </View>
                )}
                />

                <View style={styles.exit}>
                    <Text>BINNU DHILLON | <Text onPress={this.exit}>退出</Text></Text>
                </View>
                </ScrollView>
            </View>
        ) 
    }

}
const styles = StyleSheet.create({
	box:{
        width:"100%",
        height:330*w,
        backgroundColor:"#f23030",
        justifyContent: 'center',
    },
    p1:{
        textAlignVertical: 'center',   
        color:"white",
        fontSize:18,  
        marginTop:"5%",
        marginLeft:"35%",
    },
    moren1:{
        width:140*w,
        height:140*w,
        borderRadius:70*w,
        marginTop:40*w,
        marginLeft:250*w,
    },
    moren:{
        width:140*w,
        height:140*w,
        borderRadius:70*w,
    },
    img:{
        width:140*w,
        height:140*w,
        borderWidth:3,
        borderRadius:70*w,
    },
    person:{
        alignItems:"center",
        flexDirection:"row",
        marginTop:15,
        marginBottom:20,
    },
    perimg:{
        height:40*w,
        width:40*w,
        overflow:"hidden",
        marginLeft:6*w,
        marginRight:10*w,
    },
    per:{
        marginLeft:50*w,
        marginRight:50*w,
        justifyContent:"space-around",
    },
    pic:{
        height:40*w,
        width:40*w,
        marginTop:10*w,
        marginLeft:25*w,
    },
    exit:{
        justifyContent:"center",
        alignItems:"center",
        color:"gray",
        backgroundColor:"#eeeeee",
        height:80*w,
    },
    ezhd:{
        justifyContent:"center",

    },
    ez:{
        width:200*w,
        backgroundColor:"#f23030",
        justifyContent:"center",
        textAlign:"center"
    }
});