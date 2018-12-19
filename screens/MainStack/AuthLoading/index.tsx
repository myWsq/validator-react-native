/**
 * App用户身份认证时的Loading页面
 * @author wsq
 */

import * as React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { NavigationScreenProps } from 'react-navigation';
import { get } from '../../../utils/fetch';
import { Response, ResponseCode } from '../../../utils/interface';
import { state } from '../../../utils/store';

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
		try {
			const res = await get('/auth');
			const data = (await res.json()) as Response;
			/** 将用户信息放入中心仓库中 */
			if (data.code === ResponseCode.SUCCESS) {
				state.user = data.data;
				/** 判断用户是否认证完毕 */
				this.props.navigation.navigate(state.user.public_token ? 'Main' : 'Confirm');
			} else {
				/** 认证失败, 跳转至鉴权界面 */
				this.props.navigation.navigate('Auth');
			}
		} catch (e) {
			/** 认证失败, 跳转至鉴权界面 */
			this.props.navigation.navigate('Auth');
		}
	};

	public render() {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text>Loading...</Text>
			</View>
		);
	}
}
