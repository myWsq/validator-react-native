import * as React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { List, ListItem, IconProps } from 'react-native-elements';
import Container from '../../../components/Container';
import { state } from '../../../utils/store';
import { AsyncStorage, Alert } from 'react-native';
import { TOKEN_LABEL } from '../../../utils/config';

import styled from 'styled-components/native';
import Title from '../../../components/Title';

export interface HomeProps extends NavigationScreenProps {}

export interface HomeState {
	qrcodeInfo: string;
}

export interface ListType {
	key: string;
	title: string;
	icon: IconProps;
	onPress?: any;
}

export default class Home extends React.Component<HomeProps, HomeState> {
	constructor(props: HomeProps) {
		super(props);

		this.state = {
			qrcodeInfo: '',
		};
	}

	LIST: ListType[] = [
		{
			key: 'qrcode',
			title: '身份二维码',
			icon: {
				name: 'qrcode',
				type: 'material-community',
			},
			onPress: () => {
				this.props.navigation.push('QRcode');
			},
		},
		{
			key: 'auth',
			title: '请求认证',
			icon: {
				name: 'box',
				type: 'feather',
			},
			onPress: () => {
				this.props.navigation.push('AuthScreen');
			},
		},
		{
			key: 'search',
			title: '查询认证记录',
			icon: {
				name: 'search',
			},
			onPress: () => {
				this.props.navigation.push('RecordScreen');
			},
		},
		{
			key: 'logout',
			title: '登出',
			icon: {
				name: 'logout-variant',
				type: 'material-community',
			},
			onPress: () => {
				this.onLogout();
			},
		},
		{
			key: 'clear',
			title: '清除所有数据',
			icon: {
				name: 'clear',
				type: 'material',
				color: 'red',
			},
			onPress: () => {
				this.onClear();
			},
		},
	];

	onClear = async () => {
		Alert.alert('确定清空吗', '再次使用将需要重新认证', [
			{
				text: '取消',
				style: 'cancel',
			},
			{
				text: '确定',
				style: 'destructive',
				onPress: async () => {
					await AsyncStorage.clear();
					this.props.navigation.navigate('AuthLoading');
				},
			},
		]);
	};

	onLogout = async () => {
		Alert.alert('确定登出吗', '', [
			{
				text: '取消',
				style: 'cancel',
			},
			{
				text: '确定',
				style: 'destructive',
				onPress: async () => {
					await AsyncStorage.removeItem(TOKEN_LABEL);
					this.props.navigation.navigate('AuthLoading');
				},
			},
		]);
	};

	public render() {
		return (
			<Container>
				<Title>欢迎, {state.user.username}</Title>
				<List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0, marginTop: 0 }}>
					{this.LIST.map((item) => (
						<ListItem key={item.key} title={item.title} leftIcon={item.icon} onPress={item.onPress} />
					))}
				</List>
			</Container>
		);
	}
}

const Row = styled.TouchableOpacity`
	display: flex;
	margin-top: -60;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	height: 500;
`;
