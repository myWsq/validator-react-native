import * as React from 'react';
import { SafeAreaView, StyleProp, ViewStyle } from 'react-native';

export interface ContainerProps {
	style?: StyleProp<ViewStyle>;
}

export interface ContainerState {}

export default class Container extends React.Component<ContainerProps, ContainerState> {
	constructor(props: ContainerProps) {
		super(props);

		this.state = {};
	}
	public render() {
		return (
			<SafeAreaView style={this.props.style ? this.props.style : styles.container}>
				{this.props.children}
			</SafeAreaView>
		);
	}
}

const styles = {
	container: {
		marginLeft: 20,
		marginRight: 20,
	},
};
