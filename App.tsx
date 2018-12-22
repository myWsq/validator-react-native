import { createStackNavigator, createNavigationContainer, createSwitchNavigator } from 'react-navigation';
import SignUp from './screens/AuthStack/SignUp';
import SignIn from './screens/AuthStack/SignIn';
import AuthLoading from './screens/MainStack/AuthLoading';
import InputInfo from './screens/ConfirmStack/InputInfo';
import ConfirmSuccess from './screens/ConfirmStack/ConfirmSuccess';
import Home from './screens/MainStack/Home';

const MainStack = createStackNavigator({
	Home,
});

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
