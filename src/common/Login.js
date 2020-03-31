import React, {Component} from 'react';
import {View, Text, Image, TextInput, AsyncStorage, TouchableOpacity, Alert} from 'react-native';
import { Icon } from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import {myFetch} from '../utils'


const rootUrl = 'https://www.fastmock.site/mock/43ad1e0f2d2f843b775382475c40f904/api';
export default class Login extends Component {
    constructor(){
        super();
        this.state = {
            username:'',
            pwd:'',
            isloading:false
        }
    }
    userhandle = (text)=>{
        this.setState({username:text})
    }
    pwdhandle = (text)=>{
        this.setState({pwd:text})
    }
    login = ()=>{
      if(this.state.username != "" && this.state.pwd != ""){
          this.setState({isloading:true})
          myFetch.post('/login',{
            username:this.state.username,
            pwd:this.state.pwd}
        ).then(res=>{
          if(res.data.token == "1"){
            Alert.alert("账户已存在！");
          }else if(res.data.token == "2"){
            Alert.alert("连接错误");
          }else{
            AsyncStorage.getItem('user',(err,res)=>{
              console.log(JSON.parse(res));
              if(JSON.parse(res) === ''){
                ToastAndroid.show("您还没有注册，请注册!",ToastAndroid.SHORT)
              }else if(JSON.parse(res).username === this.state.username && JSON.parse(res).pwd === this.state.pwd){
                ToastAndroid.show("登录成功!",ToastAndroid.SHORT)
              }
          })
          }
          console.log(res.data);
        })
    }else{
      Alert.alert("存在输入项为空")
    }
  }

  render() {
    return (
      <View style={{flex: 1,justifyContent: 'center'}}>
        <View
          style={{ alignItems: 'center'}}>
          <View
            style={{
              width: '80%',
              marginRight: 10,
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 20,
            }}>
            <Icon name="user" color="red"/>
            <TextInput placeholder="用户名" 
                onChangeText={this.userhandle}
            />
          </View>
          <View
            style={{
              width: '80%',
              marginRight: 10,
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 20,
            }}>
            <Icon name="user" color="red"/>
            <TextInput 
                onChangeText={this.pwdhandle}
                placeholder="密码" 
                secureTextEntry={true}
            />
            
          </View>
            <TouchableOpacity 
                style={{
                    width: '80%',
                    height: 40,
                    backgroundColor: '#ccc',
                    marginTop: 30,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onPress={this.login}>
                <Text>登录</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={{
                    width: '80%',
                    height: 40,
                    backgroundColor: '#ccc',
                    marginTop: 30,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onPress={()=>{Actions.regist()}}>
                <Text>立即注册</Text>
            </TouchableOpacity>
            
        </View>
        {
            this.state.isloading
            ?<View><Text>正在登录......</Text></View>
            :null
        }
        {/* <View><Text onPress={Actions.regist()}>立即注册</Text></View> */}
      </View>
      
    );
  }
}