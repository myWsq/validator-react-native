import * as React from 'react';
import { Button, View, ButtonProps, StyleSheet, ViewStyle } from 'react-native';
export interface QButtonProps extends ButtonProps {}

export interface QButtonState {}

export default class QButton extends React.Component<QButtonProps, QButtonState> {
	constructor(props: QButtonProps) {
		super(props);

		this.state = {};
	}

	public render() {
		return (
			<View>
				<Button title={this.props.title} onPress={this.props.onPress} />
			</View>
		);
	}
}

