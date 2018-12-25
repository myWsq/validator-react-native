import * as React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import Container from '../../../../components/Container';
import { get } from '../../../../utils/fetch';
import { Response, ResponseCode } from '../../../../utils/interface';
import { AsyncStorage, Alert, View } from 'react-native';
import { PRIVATE_KEY_LABEL } from '../../../../utils/config';
import { RSA } from 'react-native-rsa-native';
import TouchID from 'react-native-touch-id';
import { color } from '../../../../theme';
import { Text } from 'react-native-elements';
import Spinner from 'react-native-spinkit';
import QRCode from 'react-native-qrcode';
export interface QRcodeProps extends NavigationScreenProps {}

export interface QRcodeState {
	qrcodeInfo: string;
}

export default class QRcode extends React.Component<QRcodeProps, QRcodeState> {
	constructor(props: QRcodeProps) {
		super(props);

		this.state = {
			qrcodeInfo: '',
		};
	}
	/** 获取用户自身信息 */
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
				this.setState({
					qrcodeInfo,
				});
			}
		} catch (error) {
			Alert.alert('失败', '请进行生物认证');
		}
	};

	componentWillMount() {
		this.onQrcodeGenerate();
	}

	componentWillUnmount() {
		this.setState({
			qrcodeInfo: '',
		});
	}

	public render() {
		return (
			<Container style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				{this.state.qrcodeInfo.length === 0 ? (
					<View style={{ display: 'flex', alignItems: 'center' }}>
						<Spinner size={50} type="Bounce" color={color.primary} />
						<Text style={{ color: color.info }}>努力加载信息中...</Text>
					</View>
				) : (
					<QRCode value={this.state.qrcodeInfo} size={200} />
				)}
			</Container>
		);
	}
}
