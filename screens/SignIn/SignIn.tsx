/**
 * 用户注册页面
 * @author wsq
 */

import * as React from 'react';
import { StyleSheet, Text, View, Alert, AsyncStorage } from 'react-native';
import { Button, FormInput, FormLabel, FormValidationMessage, colors } from 'react-native-elements';
import { color, fontFamily } from '../../theme';
import { isAlphanumeric } from 'validator';
import { NavigationScreenProps, SafeAreaView } from 'react-navigation';
import { TOKEN_LABEL } from '../../utils/config';
import { post } from '../../utils/fetch';
export interface SignInProps extends NavigationScreenProps {}

export interface SignInState {
	username: string;
	password: string;
	usernameErrorMessage: string;
	passwordErrorMessage: string;
	loading: number;
}

export default class SignIn extends React.Component<SignInProps, SignInState> {
	constructor(params) {
		super(params);
		this.state = {
			username: '',
			password: '',
			usernameErrorMessage: '',
			passwordErrorMessage: '',
			loading: 0,
		};
	}

	onUsernameChange = (text: string) => {
		this.setState({
			username: text,
		});
	};

	onPasswordChange = (text: string) => {
		this.setState({
			password: text,
		});
	};

	/** 验证字段是否都有效 */
	get isValid() {
		return (
			this.state.username &&
			!this.state.usernameErrorMessage &&
			this.state.password &&
			!this.state.passwordErrorMessage
		);
	}
	onSubmit = async () => {
		if (this.isValid) {
			this.setState({
				loading: this.state.loading + 1,
			});
			const { username, password } = this.state;
			const res = await post('/auth', {
				username,
				password,
			});
			const data = await res.json();

			/** 登录成功 */
			if (data.success) {
				/** 将token写入本地存储内 */
				await AsyncStorage.setItem(TOKEN_LABEL, data.token);

				/** 跳转至主流程 */
				this.props.navigation.navigate('Main');
			} else {
        
			}
			this.setState({
				loading: this.state.loading - 1,
			});
		}
	};
	render() {
		return (
			<SafeAreaView style={styles.container}>
				<Text style={styles.title}>登录</Text>
				<View style={styles.line} />
				<FormLabel fontFamily={fontFamily}>用户名</FormLabel>
				<FormInput returnKeyType="next" onChangeText={this.onUsernameChange} placeholder="请输入您的用户名" />
				<FormValidationMessage>{this.state.usernameErrorMessage}</FormValidationMessage>
				<FormLabel>密码</FormLabel>
				<FormInput
					secureTextEntry
					enablesReturnKeyAutomatically
					onChangeText={this.onPasswordChange}
					placeholder="请输入您的密码"
					returnKeyType="done"
				/>
				<FormValidationMessage>{this.state.passwordErrorMessage}</FormValidationMessage>
				<Button
					disabled={!this.isValid}
					style={styles.button}
					rounded
					backgroundColor={color.primary}
					title="登录"
					onPress={this.onSubmit}
					loading={this.state.loading > 0}
				/>
				<View style={styles.bottomContainer}>
					<Text style={styles.bottomText}>还没有账户? </Text>
					<Text
						onPress={() => {
							this.props.navigation.navigate('SignUp');
						}}
						style={styles.signInLink}
					>
						立即注册
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
