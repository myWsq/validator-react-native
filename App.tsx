import { createStackNavigator, createNavigationContainer, createSwitchNavigator } from 'react-navigation';
import SignUp from './screens/AuthStack/SignUp';
import SignIn from './screens/AuthStack/SignIn';
import AuthLoading from './screens/MainStack/AuthLoading';
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

const RootStack = createSwitchNavigator(
	{
		AuthLoading,
		Main: MainStack,
		Auth: AuthStack,
	},
	{
		initialRouteName: 'AuthLoading',
	}
);

export default createNavigationContainer(RootStack);
