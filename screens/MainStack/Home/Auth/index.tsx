import * as React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import Container from '../../../../components/Container';
import Title from '../../../../components/Title';
import { Text, Button } from 'react-native-elements';
import { View, Alert } from 'react-native';
import { color } from '../../../../theme';
import styled from 'styled-components/native';
import TouchID from 'react-native-touch-id';

export interface AuthScreenProps extends NavigationScreenProps {}

export interface AuthScreenState {}

export default class AuthScreen extends React.Component<AuthScreenProps, AuthScreenState> {
	constructor(props: AuthScreenProps) {
		super(props);

		this.state = {};
	}

	onSubmit = async () => {
		try {
			const isAuthenticate = await TouchID.authenticate('请进行生物认证', {
				color: color.primary,
				fallbackTitle: '',
			});
			if (isAuthenticate) {
				Alert.alert('成功', '您已授权成功', [
					{
						text: 'OK',
						onPress: () => {
							this.props.navigation.goBack();
						},
					},
				]);
			}
		} catch (error) {
			Alert.alert('失败', '请进行生物认证');
		}
	};

	onCancel = () => {
		this.props.navigation.goBack();
	};

	public render() {
		return (
			<Container style={{ flex: 1, marginLeft: 20, marginRight: 20 }}>
				<Title>来自 12306</Title>
				<View
					style={{
						flex: 1,
						marginLeft: -20,
						marginRight: -20,
						justifyContent: 'space-between',
						marginTop: 20,
					}}
				>
					<View>
						<MyTitle>授权原因</MyTitle>
						<MyText>购买 G83 北京西 9∶00 长沙南 14∶40 二等座车票</MyText>
						<MyTitle>授权时间</MyTitle>
						<MyText>{new Date().toLocaleString()}</MyText>
					</View>
					<View>
						<Button backgroundColor={color.primary} title="确定授权" rounded onPress={this.onSubmit} />
						<Button
							backgroundColor="white"
							buttonStyle={{ borderWidth: 1, borderColor: '#555', marginTop: 10 }}
							color="#555"
							title="取消"
							rounded
							onPress={this.onCancel}
						/>
					</View>
				</View>
			</Container>
		);
	}
}

const MyText = styled.Text`
	margin-top: 20;
	margin-bottom: 20;
	margin-left: 20;
	margin-right: 20;
	font-size: 16;
	line-height: 25;
`;

const MyTitle = styled.Text`
	margin-left: 20;
	margin-right: 20;
	font-size: 20;
	font-weight: 500;
`;
