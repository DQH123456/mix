import React,{useState,useEffect} from 'react';
import {View,BackHandler,ToastAndroid,AsyncStorage,Alert} from 'react-native';
import {Router, Scene, Tabs, Modal, Actions} from 'react-native-router-flux';
import { Icon } from '@ant-design/react-native';
import SplashScreen from 'react-native-splash-screen';
import Home from './src/home/Home'
import Goods from './src/goods/Goods'
import User from './src/userinfor/User'
import Issue from './src/userinfor/Issue'
import Login from './src/common/Loginac'
import SwiperPage from './src/common/SwiperPage';
import Regist from './src/common/Regist';


console.disableYellowBox = true;

const App = () => {
	let [isLogin,setLogin] = useState(false);
	let [isInstall,setInstall] = useState(true);
	let now = 0;
	let init = ()=>{
		AsyncStorage.getItem('isInstall')
		.then(res=>{
			console.log('isinstall',res)
			if(res){
				setInstall(false);
			}
		})
		AsyncStorage.getItem('user')
		.then(res=>{
			let user = JSON.parse(res)
			console.log(user)
			if(!user){
				SplashScreen.hide();
			}
			if(user&&user.token){
				setLogin(true);
				SplashScreen.hide();
			}
		})
	}
	useEffect(()=>{
		init();
	},[])
	let afterInstall = ()=>{
		console.log('after install')
		setInstall(false)
	}
	if(isInstall){
		return <View style={{flex:1}}>
			<SwiperPage afterInstall={afterInstall}/>
		</View>
	}
	return (
		<Router
			// backAndroidHandler={() => {
			// 	if(Actions.currentScene != 'home'){
			// 		Actions.pop();
			// 		return true;
			// 	}else{
			// 		if(new Date().getTime()-now<2000){
			// 			BackHandler.exitApp();
			// 		}else{
			// 			ToastAndroid.show('确定要退出吗',100);
			// 			now = new Date().getTime();
			// 			return true;
			// 		}
			// 	}
			// }}
			backAndroidHandler={() => {
                if(Actions.state.routes[0].index>0){
                    Actions.pop()
                    return true;
                }
                Alert.alert('温馨提示:','确定退出应用吗?',[{text:'取消'},{
                    text:'确定',onPress:()=>{
                        BackHandler.exitApp();
                    }
				} ])
                return true;
            }}
		>
			<Modal key="modal" hideNavBar>
				<Scene key="root">
					<Tabs 
						key='tabbar'
						hideNavBar
						activeTintColor="red"
						inactiveTintColor="gray"
					>
						{/* 首页 */}
						<Scene key='homePage'
							hideNavBar
							title='首页'
							icon={
								({focused})=><Icon 
									color={focused?'red':'gray'} 
									name="home"
								/>
							}
						>
							<Scene key='ser' 
								component={Home}
							/>
						</Scene>
						{/* 商品分类 */}
						<Scene key='goodsPage'
							hideNavBar
							title="购物车"
							icon={
								({focused})=><Icon 
									color={focused?'red':'gray'} 
									name="shopping-cart"
								/>
							}
							
						>
							<Scene key="test" component={Goods}/>
						</Scene>
						{/* 用户中心 */}
						<Scene 
							hideNavBar
							key='userPage'
							hideDrawerButton
							icon={({focused})=>
								<Icon 
									color={focused?'red':'gray'} 
									name='user'/>
								}
							title="用户中心"
							component={User}>
							
						</Scene>
					</Tabs>
				</Scene>
				<Scene initial={!isLogin} key="login" component={Login} />
				<Scene key="regist"
					component={Regist} />
				<Scene key="issue" 
					titleStyle={{flex:1,textAlign:"center",color:"red"}}
					renderRightButton={<View></View>}
					hideTabBar={true}
					title="我的发布" component={Issue}
					icon={({focused})=>
						<Icon color={focused?"red":"#959595"}/>				
				}/>
			</Modal>
		</Router>
	);
};

export default App;