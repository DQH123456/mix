import React, { Component } from 'react';
import {TouchableOpacity,StyleSheet,TextInput,View,Text,Alert, ToastAndroid,AsyncStorage} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon } from '@ant-design/react-native';
import { myFetch } from '../utils';

export default class Regist extends Component {
    constructor(){
        super();
        this.state = {
            username:'',
            pwd:'',
        }
    }
    useEffect=(()=>{
        SplashScreen.hide();
        fetch(rootUrl+'/topics?limit=5')
            .then(res=>res.json())
            .then(res=>console.log(JSON.stringify(res)))
	},[])
    userhandle = (text)=>{
        this.setState({username:text})
    }
    pwdhandle = (text)=>{
        this.setState({pwd:text})
    }
    pwdAhandle = (text)=>{
        this.setState({pwdA:text})
    }
    regist=()=>{
        this.setState({isLoading:true})
        const timer = setInterval(()=>{
            const t = this.state.timer -1;
            if(t ===0){
                clearInterval(timer);
                myFetch.post("./register",{
                    username:this.state.username,
                    password:this.state.password
                }).then(res=>{
                    console.log(res);
                    this.setState({isLoading:false})
                    ToastAndroid.showWithGravity("注册成功！")
                }).then(()=>{
                    this.setState({time:3})
                    Actions.login()
                })
            }else{
                this.setState({time:t})
            }
        },1000);
    }
    register = () =>{
        if(this.state.username != '' && this.state.password != '' && this.state.passwordA != ''){
            if(this.state.password != this.state.passwordA){
                ToastAndroid.show('两次输入的密码不一致！', ToastAndroid.SHORT);
            }
            else{
                this.setState({isloading:true})
                myFetch.post('/register',{
                    username: this.state.username,
                    pwd: this.state.password}
                ).then(res=>{
                    // 根据返回状态进行判断，正确时跳转首页
                    if(res.data.token=='11' || res.data.token=='22'){
                        ToastAndroid.show('该账号已存在！', ToastAndroid.SHORT);
                    }else{
                    AsyncStorage.setItem('userid',JSON.stringify(res.data))
                        .then(()=>{
                            console.log(res)
                            this.setState({isloading:false});
                            ToastAndroid.show("注册成功，请登录！",ToastAndroid.SHORT);
                            Actions.login();
                        })
                    }
                })
            }
        }
        else{
            ToastAndroid.show('请确认用户名密码不为空！', ToastAndroid.SHORT);
        }
    }
    render() {
        
        return (
            <TouchableOpacity
                activeOpacity={1.0}  //设置背景被点击时，透明度不变
                style={styles.container}>
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
                        placeholder="用户名"
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
                        placeholder="密码"
                        secureTextEntry={true} 
                        onChangeText={this.pwdhandle}
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
                        placeholder="请确认密码"
                        secureTextEntry={true} 
                        onChangeText={this.pwdAhandle}
                        />
                    </View>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={this.register}>
                        <Text>注册</Text>
                    </TouchableOpacity>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    input: {
        width: 200,
        height: 40,
        fontSize: 20,
        color: '#fff',//输入框输入的文本为白色
    },
    inputBox: {
        justifyContent: 'center',
        width: 340,
        height:40,
        fontSize:12,
        borderWidth:0.5,
        marginBottom: 8,
    },
    button: {
        width: '80%',
        height: 40,
        backgroundColor: '#ccc',
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center'
    }
});