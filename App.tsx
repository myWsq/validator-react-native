import { createStackNavigator, createNavigationContainer, createSwitchNavigator } from 'react-navigation';
import SignUp from './screens/AuthStack/SignUp';
import SignIn from './screens/AuthStack/SignIn';
import AuthLoading from './screens/MainStack/AuthLoading';
import InputInfo from './screens/ConfirmStack/InputInfo';
import ConfirmSuccess from './screens/ConfirmStack/ConfirmSuccess';
import Home from './screens/MainStack/Home';
import QRcode from './screens/MainStack/Home/QRcode';
import AuthScreen from './screens/MainStack/Home/Auth';
import RecordScreen from './screens/MainStack/Home/Record';

const MainStack = createStackNavigator(
	{
		Home: {
			screen: Home,
			navigationOptions: () => ({
				title: `首页`,
			}),
		},
		QRcode: {
			screen: QRcode,
			navigationOptions: () => ({
				title: `我的身份二维码`,
			}),
		},
		AuthScreen: {
			screen: AuthScreen,
			navigationOptions: () => ({
				title: `授权请求`,
			}),
		},
		RecordScreen: {
			screen: RecordScreen,
			navigationOptions: () => ({
				title: `认证记录`,
			}),
		},
	},
	{
		headerTransitionPreset: 'fade-in-place',
	}
);

const AuthStack = createStackNavigator(
	{
		SignUp,
		SignIn,
	},
	{
		initialRouteName: 'SignIn',
		headerMode: 'none',
	}
);

const ConfirmStack = createSwitchNavigator(
	{
		InputInfo,
		ConfirmSuccess,
	},
	{
		initialRouteName: 'InputInfo',
	}
);

const RootStack = createSwitchNavigator(
	{
		AuthLoading,
		Main: MainStack,
		Auth: AuthStack,
		Confirm: ConfirmStack,
	},
	{
		initialRouteName: 'AuthLoading',
	}
);

export default createNavigationContainer(RootStack);
