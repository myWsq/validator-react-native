import * as React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { View } from 'react-native';
import { Text, Button } from 'react-native-elements';

export interface HomeProps extends NavigationScreenProps {}

export interface HomeState {}

export default class Home extends React.Component<HomeProps, HomeState> {
	constructor(props: HomeProps) {
		super(props);

		this.state = {};
	}

	public render() {
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
