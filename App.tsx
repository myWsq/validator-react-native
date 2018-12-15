import * as React from 'react';
import { View, Text } from 'react-native';
import {
	createStackNavigator,
	createNavigationContainer,
	NavigationScreenProps,
	createSwitchNavigator,
} from 'react-navigation';
import SignUp from './screens/SignUp/SignUp';
import SignIn from './screens/SignIn/SignIn';
import AuthLoading from './screens/AuthLoading/AuthLoading';
import { Button } from 'react-native-elements';

class Home extends React.Component<NavigationScreenProps> {
	render() {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<Text>Home Screen</Text>
				<Button
					title="登录"
					onPress={() => {
						this.props.navigation.navigate('Auth');
					}}
				/>
			</View>
		);
	}
}

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
