import React, { Component } from "react"
import { View ,Text,StyleSheet,
    Image,TouchableOpacity,ScrollView ,
    TextInput,Dimensions, FlatList} from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome'

// import Icon from "@ant-design/icons-react-native"
const {width,scale} = Dimensions.get("window");
const s = width/640;
const goods = [
    {
        title:"Oishi/生蚝家玉米卷20包膨化休闲食品Oishi/上好佳",
        price:"36.00",
        img:require("../../assets/chip1.png")
    },
    {
        title:"Oishi/生蚝家玉米卷20包膨化休闲食品Oishi/上好佳",
        price:"36.00",
        img:require("../../assets/chip2.png")
    },
    {
        title:"Oishi/生蚝家玉米卷20包膨化休闲食品Oishi/上好佳",
        price:"36.00",
        img:require("../../assets/chip1.png")
    },
    {
        title:"Oishi/生蚝家玉米卷20包膨化休闲食品Oishi/上好佳",
        price:"36.00",
        img:require("../../assets/chip2.png")
    },
    {
        title:"Oishi/生蚝家玉米卷20包膨化休闲食品Oishi/上好佳",
        price:"36.00",
        img:require("../../assets/chip1.png")
    },
    {
        title:"Oishi/生蚝家玉米卷20包膨化休闲食品Oishi/上好佳",
        price:"36.00",
        img:require("../../assets/chip2.png")
    }
]
export default class Goods extends Component{
    render(){
        return(
            <View style={{fles:1,backgroundColor:"#fff",marginBottom:200*s,marginTop:40*s}}>
                <View style={styles.header}>
                    <View style={styles.search}>
                        <TextInput 
                        placeholder="   请输入商品名称"
                        style={{width:490*s,height:50*s,
                        padding:0}} />
                        <Icon name="search" />
                    </View>
                </View>
                <View style={styles.nav}>
                    <TouchableOpacity>
                        <Text style={{color:"red"}}>综合</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text>销量</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text>新品</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text>价格</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text>信用</Text>
                    </TouchableOpacity>
                </View>
                <FlatList 
                    style={{backgroundColor: '#F4F4F4'}}
                    data={goods}
                    numColumns={2}
                    renderItem={({item})=>(
                    <View style={styles.good}>
                        <Image 
                            // resizeMethod="contain"
                            style={{height:180*s,width:180*s,marginTop:30*s,marginBottom:30*s}}
                            source={item.img}/>
                        <Text 
                                style={{marginTop:20,fontSize:12}}
                            >{item.title}</Text>
                            <Text
                                style={{width:"100%",color:"red",marginTop:20*s,textAlign:"center",fontSize:12}}
                            >{item.price}</Text>
                        </View>
                )}
                />
                </View>
        )
    }

}
const styles = StyleSheet.create({
    header:{
        height:64*s,
        borderBottomColor:"#E8E8E8",
        borderBottomWidth:1/3,
        justifyContent:"center",
        alignItems:"center",
    },
    search:{
        width:544*s,
        height:50*s,
        backgroundColor:"#EEEEEE",
        flexDirection:"row",
        alignItems:"center",
    },
    nav:{
        height:73*s,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-around"
    },
    good:{
        height:420*s,
        width:260*s,
        backgroundColor:"white",
        marginLeft:30*s,
        marginTop:20*s,
        paddingLeft:20*s,
        alignItems:"center"
    }
})