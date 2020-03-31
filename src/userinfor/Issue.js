import React, { Component } from 'react'
import {Actions} from 'react-native-router-flux';
import {StyleSheet,View,Text,ScrollView, StatusBar, Image,ToastAndroid} from 'react-native';
import { Icon } from '@ant-design/react-native';
const ret = [
    [{id:1,tit:"待回复"}],
    [{id:2,tit:"已回复"}],
    [{id:3,tit:"待回复"}],
    [{id:5,tit:"待回复"}],
    [{id:5,tit:"待回复"}],
    [{id:6,tit:"待回复"}],
    [{id:7,tit:"待回复"}],
    [{id:8,tit:"待回复"}],
    [{id:9,tit:"待回复"}],
    [{id:0,tit:"已回复"}],
]
const arr=[1,2,3,4,4,5,6,7,8,9,10];
export default class Issue extends Component {
    constructor() {
        super();
        this.state = {
            tits: [],
            page:1,
        }
    }
    getNext = () => {
        this.setState({page:this.state.page+1})
        fetch('https://cnodejs.org/api/v1/topics?page='+this.state.page+'&limit=10')
            .then((res)=>res.json() )
            .then((res)=>{
                this.setState({data:res.data})
            });
    }
    getLast =  () => {
        if(this.state.page===1){
            ToastAndroid.show('当前已经是第一项，没有上一页!', ToastAndroid.SHORT); 
        }else{
            this.setState({page:this.state.page-1})
            fetch('https://cnodejs.org/api/v1/topics?page='+this.state.page+'&limit=10')
                .then(res => res.json())
                .then(res => {
                    this.setState({ tits: res.data });
                })
        }
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#fff" ,marginTop:10}}>
                <StatusBar  translucent={true} />
                <ScrollView styles={{flexDirection:"column-reverse"}}>
                <View style={{alignItems:"center",flexDirection:"row",backgroundColor:"red"}}>
                    <View>
                       <Icon name="backward" onPress={()=>{Actions.pop()}}
                         style={{ height:40,width:40,color:"white",overflow:"hidden",marginTop:20, marginLeft:20,}}/>
                    </View>
                    <View>
                        <Text style={{fontSize:18,color:"white"}}>我的发布</Text>
                    </View>
                </View>
                <View style={{backgroundColor:"#fff",flexDirection:"row"}}>
                    <View style={{width:"60%",justifyContent:"center"}}>
                    {
                        this.state.tits.map((item) => (
                            <View style={{ flexDirection: "row", borderBottomWidth: 1, borderColor: "#F5F5F5" }}>
                                <View style={{ height: 60, width: 240,}}>
                                    <Text style={{ fontSize: 12, lineHeight: 50, marginLeft: 20 }}>
                                        {item.title ? (item.title.length > 16 ? item.title.substr(0, 16) + "..." : item.title) : ""}
                                    </Text>
                                </View>
                                <View style={{ height: 60, width: 80,}}>
                                    <Text style={{ fontSize: 12, lineHeight: 50 }}>
                                        {item.create_at.substr(0, 10)}
                                    </Text>
                                </View>
                            </View>
                        ))
                    }
                    </View>
                    <View style={{width:'20%',marginLeft:60,alignItems:"center"}}>
                        {
                            ret.map((item)=>(
                                ret[Math.floor(Math.random()*10)].map((item)=>(
                                <Text style={{fontSize:12,height:40,marginTop:20,
                                    color:item.tit=="待回复"?"red":"black"}}>
                                    {item.tit}
                                </Text>
                                ))
                            ))
                        }
                    </View>
                </View>
                </ScrollView>
                <View style={{
                    width:"100%",
                    height:100,
                    backgroundColor:"white",
                    flexDirection:"row",
                    justifyContent:'space-between',
                    paddingTop:20,
                    paddingLeft:40,
                    paddingRight:40
                }}>
                    
                    <Text style={styles.last} onPress={this.getLast}>上一页</Text>
                    <Text style={{marginTop:16}}>第{this.state.page}页</Text>
                    <Text style={styles.last} onPress={this.getNext}>下一页</Text>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    last:{
        backgroundColor:"red",
        borderRadius:20,
        height:40,
        width:80,
        color:"white",
        textAlign:"center",
        paddingTop:10
    }
})