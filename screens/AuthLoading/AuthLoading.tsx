/**
 * App用户身份认证时的Loading页面
 * @author wsq
 */

import * as React from 'react';
import { View, AsyncStorage } from 'react-native';
import { Text } from 'react-native-elements';
import { NavigationScreenProps } from 'react-navigation';
import { TOKEN_LABEL } from '../../utils/config';

export interface AuthLoadingProps extends NavigationScreenProps {}

export interface AuthLoadingState {}

export default class AuthLoading extends React.Component<AuthLoadingProps, AuthLoadingState> {
	constructor(props: AuthLoadingProps) {
		super(props);
		this.state = {};
		/** 检测用户登录状态 */
		this._bootstrap();
	}
	_bootstrap = async () => {
		const token = await AsyncStorage.getItem(TOKEN_LABEL);
		this.props.navigation.navigate(token ? 'Main' : 'Auth');
	};

	public render() {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text>Loading...</Text>
			</View>
		);
	}
}
