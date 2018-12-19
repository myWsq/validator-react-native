/**
 * 用户注册页面
 * @author wsq
 */

import * as React from 'react';
import { StyleSheet, Text, View, Alert, AsyncStorage } from 'react-native';
import { Button, FormInput, FormLabel, FormValidationMessage, colors } from 'react-native-elements';
import { color, fontFamily } from '../../../theme';
import { isAlphanumeric } from 'validator';
import { NavigationScreenProps, SafeAreaView } from 'react-navigation';
import { get, post } from '../../../utils/fetch';
import { Response, ResponseCode } from '../../../utils/interface';
export interface SignUpProps extends NavigationScreenProps {}

export interface SignUpState {
	username: string;
	password: string;
	checkPassword: string;
	usernameErrorMessage: string;
	passwordErrorMessage: string;
	checkPasswordErrorMessage: string;
	loading: number;
}

export default class SignUp extends React.Component<SignUpProps, SignUpState> {
	constructor(params) {
		super(params);
		this.state = {
			username: '',
			password: '',
			checkPassword: '',
			usernameErrorMessage: '',
			passwordErrorMessage: '',
			checkPasswordErrorMessage: '',
			loading: 0,
		};
	}

	onUsernameChange = (text: string) => {
		this.setState({
			username: text,
		});
		if (text && (text.length < 5 || text.length > 12)) {
			this.setState({
				usernameErrorMessage: '用户名长度应在5-12位之间',
			});
		} else if (text && !isAlphanumeric(text)) {
			this.setState({
				usernameErrorMessage: '用户名包含特殊字符',
			});
		} else {
			this.setState({
				usernameErrorMessage: '',
			});
		}
	};

	onPasswordChange = (text: string) => {
		this.setState({
			password: text,
		});
		if (text && (text.length < 6 || text.length > 20)) {
			this.setState({
				passwordErrorMessage: '密码长度应在6-20位之间',
			});
		} else {
			this.setState({
				passwordErrorMessage: '',
			});
		}
	};

	onCheckPasswordChange = (text: string) => {
		this.setState({
			checkPassword: text,
		});
		if (text && text !== this.state.password) {
			this.setState({
				checkPasswordErrorMessage: '两次密码输入不一致',
			});
		} else {
			this.setState({
				checkPasswordErrorMessage: '',
			});
		}
	};

	/** 验证字段是否都有效 */
	get isValid() {
		return (
			this.state.username &&
			!this.state.usernameErrorMessage &&
			this.state.password &&
			!this.state.passwordErrorMessage &&
			this.state.checkPassword &&
			!this.state.checkPasswordErrorMessage
		);
	}
	onSubmit = async () => {
		if (this.isValid) {
			this.setState({
				loading: this.state.loading + 1,
			});
			const res = await post('/user', {
				username: this.state.username,
				password: this.state.password,
			});
			const data = (await res.json()) as Response;

			/** 判断请求结果 */
			switch (data.code) {
				/** 用户名已存在 */
				case ResponseCode.USERNAME_EXIST:
					this.setState({
						usernameErrorMessage: '用户名已存在',
					});
					break;
				case ResponseCode.SUCCESS:
					/** 将token写入本地存储内 */
					await AsyncStorage.setItem('token', data.data.token);
					Alert.alert('注册成功', null, [
						{
							text: 'OK',
							onPress: () => {
								/** 跳转至登录 */
								this.props.navigation.navigate('AuthLoading');
							},
						},
					]);
					break;
				default:
					break;
			}
			this.setState({
				loading: this.state.loading - 1,
			});
		}
	};
	render() {
		return (
			<SafeAreaView style={styles.container}>
				<Text style={styles.title}>注册账户</Text>
				<View style={styles.line} />
				<FormLabel fontFamily={fontFamily}>用户名</FormLabel>
				<FormInput returnKeyType="next" onChangeText={this.onUsernameChange} placeholder="请输入您的用户名" />
				<FormValidationMessage>{this.state.usernameErrorMessage}</FormValidationMessage>
				<FormLabel>密码</FormLabel>
				<FormInput
					secureTextEntry
					onChangeText={this.onPasswordChange}
					placeholder="请输入您的密码"
					returnKeyType="next"
				/>
				<FormValidationMessage>{this.state.passwordErrorMessage}</FormValidationMessage>
				<FormLabel>确认密码</FormLabel>
				<FormInput
					onSubmitEditing={this.onSubmit}
					onChangeText={this.onCheckPasswordChange}
					returnKeyType="join"
					secureTextEntry
					placeholder="请再次输入您的密码"
					style={{ height: 40 }}
				/>
				<FormValidationMessage>{this.state.checkPasswordErrorMessage}</FormValidationMessage>
				<Button
					disabled={!this.isValid}
					style={styles.button}
					rounded
					backgroundColor={color.primary}
					title="注册"
					onPress={this.onSubmit}
					loading={this.state.loading > 0}
				/>
				<View style={styles.bottomContainer}>
					<Text style={styles.bottomText}>已有账户?</Text>
					<Text
						onPress={() => {
							this.props.navigation.navigate('SignIn');
						}}
						style={styles.signInLink}
					>
						登录
					</Text>
				</View>
			</SafeAreaView>
		);
	}
}

export const styles = StyleSheet.create({
	container: {
		paddingTop: 100,
	},
	title: {
		fontFamily: fontFamily,
		fontSize: 30,
		marginTop: 30,
		marginLeft: 20,
	},
	line: {
		height: 3,
		width: 40,
		marginTop: 10,
		marginLeft: 20,
		marginBottom: 20,
		backgroundColor: color.primary,
	},
	button: {
		marginTop: 40,
	},
	bottomContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	bottomText: {
		color: color.info,
		marginTop: 20,
	},
	signInLink: {
		padding: 20,
		paddingLeft: 10,
		color: color.primary,
		fontWeight: 'bold',
	},
});
