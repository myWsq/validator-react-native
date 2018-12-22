import * as React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { Text, Button } from 'react-native-elements';
import Container from '../../../components/Container';
import { get } from '../../../utils/fetch';
import { Response, ResponseCode } from '../../../utils/interface';
import { RSA, RSAKeychain } from 'react-native-rsa-native';
import { state } from '../../../utils/store';
import { AsyncStorage, Alert, View, Image } from 'react-native';
import { PRIVATE_KEY_LABEL } from '../../../utils/config';

import TouchID from 'react-native-touch-id';
import { color } from '../../../theme';

import QRCode from 'react-native-qrcode';
import styled from 'styled-components/native';
import Title from '../../../components/Title';

export interface HomeProps extends NavigationScreenProps {}

export interface HomeState {
	qrcodeInfo: string;
}

export default class Home extends React.Component<HomeProps, HomeState> {
	constructor(props: HomeProps) {
		super(props);

		this.state = {
			qrcodeInfo: '',
		};
	}

	getQrcodeInfo = async () => {
		const res = await get('/user/confirm');
		const data = (await res.json()) as Response;
		switch (data.code) {
			case ResponseCode.SUCCESS:
				/** 使用私钥解密 */
				const privateKey = await AsyncStorage.getItem(PRIVATE_KEY_LABEL);
				return await RSA.decrypt(data.data, privateKey);
			default:
				break;
		}
	};

	/** 用户点击生成二维码按钮 */
	onQrcodeGenerate = async () => {
		try {
			const isAuthenticate = await TouchID.authenticate('请进行生物认证', {
				color: color.primary,
				fallbackTitle: '',
			});
			if (isAuthenticate) {
				const qrcodeInfo = await this.getQrcodeInfo();
				console.log(qrcodeInfo);
				this.setState({
					qrcodeInfo,
				});
			}
		} catch (error) {
			Alert.alert('失败', '请进行生物认证');
		}
	};

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

	public render() {
		return (
			<Container>
				<Title>欢迎, {state.user.username}</Title>
				{!this.state.qrcodeInfo ? (
					<Row
						onPress={this.onQrcodeGenerate}
					>
						<Image
							style={{ width: 250, height: 250 }}
							source={require('../../../assets/fingerprint-scanning.png')}
						/>
					</Row>
				) : (
					<Row onPress={() => this.setState({ qrcodeInfo: '' })}>
						<QRCode value={this.state.qrcodeInfo} size={200} />
					</Row>
				)}
				<Button color="#fff" backgroundColor="red" title="清空本地数据" onPress={this.onClear} />
			</Container>
		);
	}
}

const Row = styled.TouchableOpacity`
	display: flex;
	margin-top: -50;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	height: 500;
`;
